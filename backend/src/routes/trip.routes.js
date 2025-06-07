import { Router } from 'express';
import {
  createTrip,
  getUserTrips,
  getNextTrip,
  getTripDetails,
  updateTrip,
  deleteTrip
} from '../controllers/trip.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

// Todas estas rutas requieren que el usuario esté autenticado
router.post('/', auth, createTrip); // Crear un nuevo viaje
router.get('/', auth, getUserTrips); // Obtener todos los viajes del usuario autenticado
router.get('/next', auth, getNextTrip); // Obtener el próximo viaje del usuario autenticado
router.get('/:tripId', auth, getTripDetails); // Obtener detalles de un viaje específico
router.put('/:tripId', auth, updateTrip); // Actualizar un viaje específico
router.delete('/:tripId', auth, deleteTrip); // Eliminar un viaje específico

export default router;