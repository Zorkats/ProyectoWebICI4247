// controllers/search.controller.js
import { Op } from 'sequelize';
import db from '../models/index.js';

const { Destination, PointOfInterest,PoiCategory } = db;

// GET /api/search?q=...&category=...
export const performSearch = async (req, res) => {
  const { q, category } = req.query;

  // CAMBIO 1: Si no hay 'q' Y no hay 'category', devolvemos vacío.
  // Pero si hay 'category', continuamos.
  if (!q && (!category || category === 'all')) {
    return res.json([]);
  }

  const searchTerm = q ? `%${q}%` : '%';
  // Usamos iLike para búsquedas insensibles a mayúsculas/minúsculas en PostgreSQL
  // Para MySQL, Op.like es generalmente insensible por defecto según la colación de la tabla
  const likeOperator = db.sequelize.getDialect() === 'postgres' ? Op.iLike : Op.like;

  try {
    const searchPromises = [];
    const poiWhereClause = {};
    const destinationWhereClause = {};

    // Añadir condición de búsqueda si 'q' existe
    if (q) {
      destinationWhereClause[Op.or] = [
        { name: { [likeOperator]: searchTerm } },
        { country: { [likeOperator]: searchTerm } },
        { description: { [likeOperator]: searchTerm } }
      ];
      poiWhereClause[Op.or] = [
        { name: { [likeOperator]: searchTerm } },
        { description: { [likeOperator]: searchTerm } }
      ];
    }
    
    // Búsqueda de Destinos (solo si la categoría es 'all' o no está definida)
    if ((!category || category === 'all') && q) {
      const destinationPromise = Destination.findAll({ where: destinationWhereClause, limit: 10 })
        .then(results => results.map(r => ({ ...r.toJSON(), type: 'destination' })));
      searchPromises.push(destinationPromise);
    }
    
    // Lógica de categoría para POIs
    if (category && category !== 'all') {
      const categoryObj = await PoiCategory.findOne({ where: { name: category } });
      if (categoryObj) {
        poiWhereClause.category_id = categoryObj.id;
      } else {
        searchPromises.push(Promise.resolve([]));
      }
    }
    
    // Búsqueda de Puntos de Interés
    const poiPromise = PointOfInterest.findAll({
      where: poiWhereClause,
      limit: 15, // Aumentamos el límite para las listas de categoría
      include: [
        { model: PoiCategory, as: 'category' },
        // CAMBIO 2: Incluimos siempre el destino padre en los resultados de POI
        { model: Destination, as: 'destination', attributes: ['name', 'country'] }
      ]
    }).then(results => results.map(r => ({ ...r.toJSON(), type: 'poi' })));
    searchPromises.push(poiPromise);

    const results = await Promise.all(searchPromises);
    const flatResults = results.flat().sort((a, b) => (b.popularity_score || 0) - (a.popularity_score || 0));

    console.log(results)
    
    res.json(flatResults);

  } catch (error) {
    console.error('Error en la búsqueda global:', error.message);
    res.status(500).json({ message: 'Error en el servidor al realizar la búsqueda.' });
  }
};