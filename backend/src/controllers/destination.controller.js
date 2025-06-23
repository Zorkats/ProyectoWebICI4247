import db from '../models/index.js';

const { Destination, DestinationCategory, Trip, PoiCategory, PointOfInterest } = db;

const destinationIncludeOptions = [
  {
    model: DestinationCategory,
    as: 'category',
    attributes: ['id', 'name']
  }
];

// GET /api/destinations
// Obtiene una lista paginada de destinos.
export const getDestinations = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Destination.findAndCountAll({
      limit,
      offset,
      include: destinationIncludeOptions,
      order: [['name', 'ASC']]
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      destinations: rows
    });
  } catch (error) {
    console.error('Error al obtener destinos:', error.message);
    res.status(500).json({ message: 'Error en el servidor al obtener destinos.' });
  }
};

// GET /api/destinations/:destinationId
// Obtiene el detalle de un destino específico.
export const getDestinationDetails = async (req, res) => {
  const { destinationId } = req.params;
  try {
    const destination = await Destination.findByPk(destinationId, {
      include: destinationIncludeOptions // MEJORA: Reutilización de las opciones de include.
    });

    if (!destination) {
      return res.status(404).json({ message: 'Destino no encontrado.' });
    }
    res.json(destination);
  } catch (error) {
    console.error('Error al obtener el detalle del destino:', error.message);
    res.status(500).json({ message: 'Error en el servidor al obtener el detalle del destino.' });
  }
};

// POST /api/destinations
// Crear un nuevo destino (solo ADMIN o SUPER_ADMIN).
export const createDestination = async (req, res) => {
  const { name, description, country, main_image_url, category_id } = req.body;
  try {
    // La validación de la categoría existente es correcta y se mantiene.
    const categoryExists = await DestinationCategory.findByPk(category_id);
    if (!categoryExists) {
      return res.status(400).json({ message: 'La categoría de destino especificada no existe.' });
    }

    const newDestination = await Destination.create({
      name, description, country, main_image_url, category_id
    });


    const destinationWithCategory = await Destination.findByPk(newDestination.id, {
        include: destinationIncludeOptions
    });

    res.status(201).json({ message: 'Destino creado exitosamente.', data: destinationWithCategory });
  } catch (error) {
   
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ message: 'Datos inválidos.', errors: messages });
    }
    console.error('Error al crear destino:', error.message);
    res.status(500).json({ message: 'Error en el servidor al crear el destino.' });
  }
};

// PUT /api/destinations/:destinationId
// Actualizar un destino (solo ADMIN o SUPER_ADMIN).
export const updateDestination = async (req, res) => {
  const { destinationId } = req.params;
  try {
   
    const destination = await Destination.findByPk(destinationId);
    if (!destination) {
      return res.status(404).json({ message: 'Destino no encontrado.' });
    }

    if (req.body.category_id) {
      const categoryExists = await DestinationCategory.findByPk(req.body.category_id);
      if (!categoryExists) {
        return res.status(400).json({ message: 'La categoría de destino especificada no existe.' });
      }
    }
    
    await destination.update(req.body);

    const updatedDestination = await Destination.findByPk(destinationId, {
      include: destinationIncludeOptions
    });

    res.json({ message: 'Destino actualizado exitosamente.', data: updatedDestination });
  } catch (error) {

    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ message: 'Datos inválidos.', errors: messages });
    }
    console.error('Error al actualizar destino:', error.message);
    res.status(500).json({ message: 'Error en el servidor al actualizar el destino.' });
  }
};

// DELETE /api/destinations/:destinationId
// Borrar un destino (solo ADMIN o SUPER_ADMIN).
export const deleteDestination = async (req, res) => {
  const { destinationId } = req.params;
  try {
    
    const associatedTrips = await Trip.count({ where: { destination_id: destinationId } });
    if (associatedTrips > 0) {
      return res.status(409).json({ 
        message: 'No se puede eliminar el destino porque tiene viajes asociados.'
      });
    }

    const deletedRows = await Destination.destroy({ where: { id: destinationId } });

    if (deletedRows > 0) {
      res.status(200).json({ message: 'Destino eliminado exitosamente.' });
    } else {
      res.status(404).json({ message: 'Destino no encontrado.' });
    }
  } catch (error) {
    console.error('Error al borrar destino:', error.message);
    res.status(500).json({ message: 'Error en el servidor al borrar el destino.' });
  }
};

export const getPoisByDestination = async (req, res) => {
  const { destinationId } = req.params;
  const { category } = req.query; // Para filtrar, ej: ?category=Restaurante

  try {
    const whereClause = { destination_id: destinationId };

    if (category) {
      // Buscamos el ID de la categoría por su nombre para hacer el filtro
      const categoryObj = await db.PoiCategory.findOne({ where: { name: category } });
      if (categoryObj) {
        whereClause.category_id = categoryObj.id;
      } else {
        return res.json([]); // Si la categoría no existe, devolvemos un array vacío
      }
    }

    const pois = await PointOfInterest.findAll({
      where: whereClause,
      include: [
        {
          model: PoiCategory,
          as: 'category',
          attributes: ['name', 'icon_name']
        }
      ],
      order: [['name', 'ASC']]
    });

    res.json(pois);
  } catch (error) {
    console.error('Error al obtener Puntos de Interés:', error.message);
    res.status(500).json({ message: 'Error en el servidor al obtener Puntos de Interés.' });
  }
};
