import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  // 1. Extraer el token de la cookie
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // 2. Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Adjuntar el payload del usuario a la petición
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no es válido.' });
  }
};