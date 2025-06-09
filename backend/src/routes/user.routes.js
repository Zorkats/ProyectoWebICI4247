import { Router } from 'express';
import { getProfile, updateProfile, updatePassword, getUserStats } from '../controllers/user.controller.js';
import {protect} from '../middlewares/auth.middleware.js';

const router = Router();

// Todas las rutas de perfil deben estar protegidas por el middleware 'auth'
router.get('/', protect, getProfile); // Obtener perfil del usuario autenticado
router.put('/', protect, updateProfile); // Actualizar perfil del usuario 
router.put('/password', protect, updatePassword); // Actualizar contraseña del usuario
router.get('/stats', protect, getUserStats); // Obtener estadísticas del usuario

export default router;