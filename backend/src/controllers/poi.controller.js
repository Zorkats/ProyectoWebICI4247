// controllers/poi.controller.js
import db from '../models/index.js';

const { PointOfInterest, PoiCategory, Destination } = db;

// Obtener todos los POI para un destino específico
// GET /api/destinations/:destinationId/pois

// Obtener el detalle de un POI específico
// GET /api/pois/:poiId
export const getPoiDetails = async (req, res) => {
  const { poiId } = req.params;
  try {
    const poi = await PointOfInterest.findByPk(poiId, {
      include: [
        {
          model: PoiCategory,
          as: 'category',
          attributes: ['name', 'icon_name']
        },
        {
          model: Destination,
          as: 'destination',
          attributes: ['id', 'name', 'country']
        }
      ]
    });

    if (!poi) {
      return res.status(404).json({ message: 'Punto de Interés no encontrado.' });
    }
    res.json(poi);
  } catch (error) {
    console.error('Error al obtener detalle del POI:', error.message);
    res.status(500).json({ message: 'Error en el servidor al obtener el detalle del POI.' });
  }
};