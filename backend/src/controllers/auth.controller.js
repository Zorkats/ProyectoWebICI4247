import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const { User, UserRole } = db;

// Registro de usuario
export const register = async (req, res) => {
  const { name, email, password, roleName } = req.body;
  try {
    // Verificar existencia
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: 'El usuario ya existe.' });

    // Hash de contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Obtener rol
    const role = await UserRole.findOne({ where: { name: roleName || 'VIAJERO' } });
    if (!role) return res.status(400).json({ message: 'Rol no existe.' });

    // Crear usuario
    user = await User.create({
      name,
      email,
      passwordHash,
      roleId: role.id
    });

    // Generar JWT
    const payload = { user: { id: user.id, roleId: user.roleId } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, message: 'Registrado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas.' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas.' });

    const payload = { user: { id: user.id, roleId: user.roleId } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, message: 'Inicio de sesión exitoso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};