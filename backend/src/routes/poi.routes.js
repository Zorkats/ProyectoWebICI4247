import { Router } from 'express';
import { getPoiDetails } from '../controllers/poi.controller.js';

const router = Router();

// Rutas públicas (no requieren autenticación, si así lo deseas, o solo lectura con autenticación)
router.get('/:poiId', getPoiDetails); // Obtener lista de destinos (puede ser pública o requerir autenticación para ver detalles específicos)

export default router;