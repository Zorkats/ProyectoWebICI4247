import { Router } from 'express';
import {
  createTrip,
  getUserTrips,
  getNextTrip,
  getTripDetails,
  updateTrip,
  deleteTrip
} from '../controllers/trip.controller.js';
import {protect} from '../middlewares/auth.middleware.js';

const router = Router();

// Todas estas rutas requieren que el usuario esté autenticado
router.post('/', protect, createTrip); // Crear un nuevo viaje
router.get('/', protect, getUserTrips); // Obtener todos los viajes del usuario autenticado
router.get('/next', protect, getNextTrip); // Obtener el próximo viaje del usuario autenticado
router.get('/:tripId', protect, getTripDetails); // Obtener detalles de un viaje específico
router.put('/:tripId', protect, updateTrip); // Actualizar un viaje específico
router.delete('/:tripId', protect, deleteTrip); // Eliminar un viaje específico

export default router;