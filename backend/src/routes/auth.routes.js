// backend/src/routes/auth.routes.js
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();

// Ruta para el registro de un nuevo usuario
router.post('/register', register);

// Ruta para el inicio de sesión de un usuario
router.post('/login', login);

export default router;