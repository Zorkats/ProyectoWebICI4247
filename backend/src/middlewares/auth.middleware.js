import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del encabezado
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adjuntar usuario a la solicitud
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};