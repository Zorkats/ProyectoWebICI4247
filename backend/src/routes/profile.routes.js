import { Router } from 'express';
import { getProfile, updateProfile, updatePassword, getUserStats } from '../controllers/profile.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

// Todas las rutas de perfil deben estar protegidas por el middleware 'auth'
router.get('/', auth, getProfile); // Obtener perfil del usuario autenticado
router.put('/', auth, updateProfile); // Actualizar perfil del usuario
router.put('/password', auth, updatePassword); // Actualizar contraseña del usuario
router.get('/stats', auth, getUserStats); // Obtener estadísticas del usuario

export default router;