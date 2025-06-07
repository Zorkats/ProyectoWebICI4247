import db from '../models/index.js';

const { Destination, DestinationCategory, Trip } = db;

// GET /api/destinations
// Obtiene una lista de destinos (puede ser vista por cualquiera)
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll({
      include: [{ model: DestinationCategory, as: 'category' }]
    });
    res.json(destinations);
  } catch (error) {
    console.error('Error al obtener destinos:', error.message);
    res.status(500).json({ message: 'Error en el servidor al obtener destinos.' });
  }
};

// GET /api/destinations/:destinationId
// Obtiene el detalle de un destino específico
export const getDestinationDetails = async (req, res) => {
  const { destinationId } = req.params;
  try {
    const destination = await Destination.findByPk(destinationId, {
      include: [{ model: DestinationCategory, as: 'category' }]
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
// Crear un nuevo destino (solo ADMIN o SUPER_ADMIN)
export const createDestination = async (req, res) => {
  const { name, description, country, main_image_url, category_id } = req.body;
  try {
    // Verificar que la categoría de destino existe
    const categoryExists = await DestinationCategory.findByPk(category_id);
    if (!categoryExists) {
      return res.status(400).json({ message: 'La categoría de destino especificada no existe.' });
    }

    const newDestination = await Destination.create({
      name,
      description,
      country,
      main_image_url,
      category_id
    });
    res.status(201).json({ message: 'Destino creado exitosamente.', destination: newDestination });
  } catch (error) {
    console.error('Error al crear destino:', error.message);
    res.status(500).json({ message: 'Error en el servidor al crear el destino.' });
  }
};

// PUT /api/destinations/:destinationId
// Actualizar un destino (solo ADMIN o SUPER_ADMIN)
export const updateDestination = async (req, res) => {
  const { name, description, country, main_image_url, category_id } = req.body;
  const { destinationId } = req.params;
  try {
    // Verificar si la categoria existe
    if (category_id) {
      const categoryExists = await DestinationCategory.findByPk(category_id);
      if (!categoryExists) {
        return res.status(400).json({ message: 'La categoría de destino especificada no existe.' });
      }
    }

    const [updatedRows] = await Destination.update(
      { name, description, country, main_image_url, category_id },
      { where: { id: destinationId } }
    );

    if (updatedRows > 0) {
      const updatedDestination = await Destination.findByPk(destinationId, {
        include: [{ model: DestinationCategory, as: 'category' }]
      });
      res.json({ message: 'Destino actualizado exitosamente.', destination: updatedDestination });
    } else {
      res.status(404).json({ message: 'Destino no encontrado.' });
    }
  } catch (error) {
    console.error('Error al actualizar destino:', error.message);
    res.status(500).json({ message: 'Error en el servidor al actualizar el destino.' });
  }
};

// DELETE /api/destinations/:destinationId
// Borrar un destino (solo ADMIN o SUPER_ADMIN)
export const deleteDestination = async (req, res) => {
  const { destinationId } = req.params;
  try {
    // Opcional: Verificar si el destino tiene viajes asociados antes de eliminarlo
    // Esto podría ser una regla de negocio importante
    const associatedTrips = await Trip.count({ where: { destination_id: destinationId } });
    if (associatedTrips > 0) {
      return res.status(409).json({
        message: 'No se puede eliminar el destino porque tiene viajes asociados. Por favor, reasigna o elimina los viajes primero.'
      });
    }

    const deletedRows = await Destination.destroy({
      where: { id: destinationId }
    });

    if (deletedRows > 0) {
      res.status(204).json({ message: 'Destino eliminado exitosamente.' }); // 204 No Content
    } else {
      res.status(404).json({ message: 'Destino no encontrado.' });
    }
  } catch (error) {
    console.error('Error al borrar destino:', error.message);
    res.status(500).json({ message: 'Error en el servidor al borrar el destino.' });
  }
};