import db from '../models/index.js';

const UserRole = db.UserRole;

export const authorizeRoles = (allowedRoles) => {
  return async (req, res, next) => {
    // Si el middleware de autenticación no ha adjuntado un usuario, detener.
    if (!req.user || !req.user.roleId) {
      return res.status(401).json({ message: 'No autorizado para esta acción (usuario no autenticado o rol no definido).' });
    }

    try {
      // Obtener el rol del usuario de la base de datos para asegurar que es el actual
      const userRole = await UserRole.findByPk(req.user.roleId);

      if (!userRole) {
        return res.status(403).json({ message: 'No autorizado, rol de usuario no encontrado.' });
      }

      // Verificar si el nombre del rol del usuario está en la lista de roles permitidos
      if (allowedRoles.includes(userRole.name)) {
        next(); // El usuario tiene un rol permitido, continuar
      } else {
        res.status(403).json({ message: `Acceso denegado. Se requiere uno de los siguientes roles: ${allowedRoles.join(', ')}.` });
      }
    } catch (error) {
      console.error('Error en el middleware de autorización:', error.message);
      res.status(500).json({ message: 'Error en el servidor al verificar roles.' });
    }
  };
};