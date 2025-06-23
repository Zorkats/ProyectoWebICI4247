// controllers/itinerary.controller.js
import db from '../models/index.js';

const { ItineraryItem } = db;

// --- FUNCIÓN NUEVA: updateItineraryItem ---
// Edita un item existente (ej. para cambiarlo de día o añadir notas)
export const updateItineraryItem = async (req, res) => {
  const { itemId } = req.params;
  // TODO: Verificar que el item pertenece a un viaje del usuario autenticado

  try {
    const item = await ItineraryItem.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item del itinerario no encontrado.' });
    }

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error('Error al actualizar item del itinerario:', error.message);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// --- FUNCIÓN NUEVA: deleteItineraryItem ---
// Elimina un POI del itinerario
export const deleteItineraryItem = async (req, res) => {
  const { itemId } = req.params;
  // TODO: Verificar que el item pertenece a un viaje del usuario autenticado

  try {
    const deletedRows = await ItineraryItem.destroy({ where: { id: itemId } });

    if (deletedRows > 0) {
      res.status(200).json({ message: 'Item eliminado del itinerario exitosamente.' });
    } else {
      res.status(404).json({ message: 'Item del itinerario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar item del itinerario:', error.message);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};