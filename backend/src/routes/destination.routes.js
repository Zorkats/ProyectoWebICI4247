import { Router } from 'express';
import {
  getDestinations,
  getDestinationDetails,
  createDestination,
  updateDestination,
  deleteDestination
} from '../controllers/destination.controller.js'; 
import { protect } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Rutas públicas (no requieren autenticación, si así lo deseas, o solo lectura con autenticación)
router.get('/', getDestinations); // Obtener lista de destinos (puede ser pública o requerir autenticación para ver detalles específicos)
router.get('/:destinationId', getDestinationDetails); // Obtener detalle de un destino específico

// Rutas protegidas y con autorización de roles (solo ADMIN o SUPER_ADMIN)
router.post('/', protect, authorizeRoles(['ADMIN', 'SUPER_ADMIN']), createDestination); // Crear destino
router.put('/:destinationId', protect, authorizeRoles(['ADMIN', 'SUPER_ADMIN']), updateDestination); // Editar destino
router.delete('/:destinationId', protect, authorizeRoles(['ADMIN', 'SUPER_ADMIN']), deleteDestination); // Borrar destino

export default router;