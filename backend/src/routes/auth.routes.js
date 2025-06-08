// backend/src/routes/auth.routes.js
import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta para el registro de un nuevo usuario
router.post('/register', register);

// Ruta para el inicio de sesión de un usuario
router.post('/login', login);
router.post("/logout", protect, logout)


export default router;