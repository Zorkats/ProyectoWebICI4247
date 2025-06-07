import bcrypt from 'bcryptjs';
import db from '../models/index.js';

const User = db.User;

// GET /api/profile
// Obtiene el perfil detallado del usuario autenticado
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] } // Excluir el hash de la contraseña por seguridad
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener el perfil:', error.message);
    res.status(500).send('Error en el servidor al obtener el perfil.');
  }
};

// PUT /api/profile
// Edita los datos del usuario
export const updateProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar si el nuevo email ya está en uso por otro usuario
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
      }
    }

    // Actualizar campos
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({ message: 'Perfil actualizado exitosamente.', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error.message);
    res.status(500).send('Error en el servidor al actualizar el perfil.');
  }
};

// PUT /api/profile/password
// Edita la contraseña del usuario
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar la contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'La contraseña actual es incorrecta.' });
    }

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: 'Contraseña actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error.message);
    res.status(500).send('Error en el servidor al actualizar la contraseña.');
  }
};

// GET /api/profile/stats
// Obtiene estadísticas del usuario (ej. número de viajes, destinos creados, etc.)
export const getUserStats = async (req, res) => {
  try {


    // Contar el número de viajes creados por el usuario
    const tripsCount = await db.Trip.count({ where: { user_id: req.user.id } });

    res.json({
      userId: req.user.id,
      tripsCreated: tripsCount,
      message: 'Estadísticas de usuario obtenidas exitosamente.'
    });

  } catch (error) {
    console.error('Error al obtener estadísticas del usuario:', error.message);
    res.status(500).send('Error en el servidor al obtener estadísticas.');
  }
};