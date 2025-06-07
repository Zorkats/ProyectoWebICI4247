import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const User = db.User;
const UserRole = db.UserRole;

// Función para el registro de un nuevo usuario
export const register = async (req, res) => {
  const { name, email, password, roleName } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe con este correo electrónico.' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Obtener el ID del rol
    let role = await UserRole.findOne({ where: { name: roleName || 'VIAJERO' } }); // Por defecto, asigna 'VIAJERO'
    if (!role) {
      return res.status(400).json({ message: 'El rol especificado no existe.' });
    }

    // Crear el nuevo usuario
    user = await User.create({
      name,
      email,
      password_hash,
      role_id: role.id
    });

    // Generar Token JWT
    const payload = {
      user: {
        id: user.id,
        role_id: user.role_id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expira en 1 hora
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, message: 'Usuario registrado exitosamente.' });
      }
    );

  } catch (error) {
    console.error('Error en el registro:', error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Función para el inicio de sesión de un usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Generar Token JWT
    const payload = {
      user: {
        id: user.id,
        role_id: user.role_id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expira en 1 hora
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: 'Inicio de sesión exitoso.' });
      }
    );

  } catch (error) {
    console.error('Error en el inicio de sesión:', error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Puedes añadir más funciones de autenticación si son necesarias, por ejemplo, para restablecer contraseña o verificar token.