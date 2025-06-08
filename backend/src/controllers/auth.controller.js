import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const { User, UserRole } = db;

// Opciones para la cookie
const cookieOptions = {
  httpOnly: true, // La cookie no es accesible por JavaScript
  secure: process.env.NODE_ENV === 'production', // Solo se envía en HTTPS en producción
  sameSite: 'strict', // 'strict' para mayor seguridad contra ataques CSRF
  maxAge: 24 * 60 * 60 * 1000 // 24 horas de expiración
};

// Función para generar y enviar el token en una cookie
const generateTokenAndSendCookie = (user, statusCode, res, message) => {
  const payload = {
    user: {
      id: user.id,
      roleId: user.roleId
    }
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h' // El token expira en 24 horas
  });

  // Envía la cookie con el token
  res.cookie('jwt_token', token, cookieOptions);

  // Devuelve una respuesta JSON con datos no sensibles del usuario
  res.status(statusCode).json({
    message,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  });
};


// Registro de usuario
export const register = async (req, res) => {
  const { name, email, password, roleName } = req.body;

  try {
    // 1. Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo electrónico ya está en uso.' }); // 409 Conflict es más específico
    }

    // 2. Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Obtener el rol del usuario
    const role = await UserRole.findOne({ where: { name: roleName || 'VIAJERO' } });
    if (!role) {
      return res.status(400).json({ message: 'El rol especificado no es válido.' });
    }

    // 4. Crear el nuevo usuario
    const newUser = await User.create({
      name,
      email,
      passwordHash,
      roleId: role.id
    });

    // 5. Generar token y enviar respuesta con cookie
    generateTokenAndSendCookie(newUser, 201, res, 'Usuario registrado exitosamente.');

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
  }
};


// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar al usuario por su email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Mensaje genérico para no revelar si el email existe o no
      return res.status(401).json({ message: 'Credenciales inválidas.' }); // 401 Unauthorized
    }

    // 2. Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' }); // 401 Unauthorized
    }

    // 3. Generar token y enviar respuesta con cookie
    generateTokenAndSendCookie(user, 200, res, 'Inicio de sesión exitoso.');

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
  }
};


// Logout de usuario
export const logout = (req, res) => {
  // Limpia la cookie que contiene el token
  res.clearCookie('jwt_token');
  res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
};