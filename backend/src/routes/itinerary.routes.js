// routes/itinerary.routes.js
import express from 'express';
import { 
  updateItineraryItem,
  deleteItineraryItem
} from '../controllers/itinerary.controller.js';
import {protect} from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas para un item específico del itinerario
router.put('/:itemId', protect, updateItineraryItem);
router.delete('/:itemId', protect, deleteItineraryItem);

export default router;