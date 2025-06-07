import db from '../models/index.js';

const { Trip, User, Destination, TripStatus, Sequelize } = db;

// POST /api/trips
// Crear un nuevo viaje para el usuario autenticado
export const createTrip = async (req, res) => {
  const { name, destination_id, start_date, end_date, budget, status_id, description, image_url } = req.body;
  try {
    // El userId se obtiene del token de autenticación a través del middleware
    const userId = req.user.id;

    // Validar que los campos requeridos estén presentes
    const destinationExists = await Destination.findByPk(destination_id);
    if (!destinationExists) {
      return res.status(400).json({ message: 'El destino especificado no existe.' });
    }

    const statusExists = await TripStatus.findByPk(status_id);
    if (!statusExists) {
      return res.status(400).json({ message: 'El estado de viaje especificado no existe.' });
    } 

    const newTrip = await Trip.create({
      user_id: userId,
      destination_id,
      name,
      start_date,
      end_date,
      budget,
      status_id,
      description,
      image_url
    });

    res.status(201).json({ message: 'Viaje creado exitosamente.', trip: newTrip });
  } catch (error) {
    console.error('Error al crear el viaje:', error.message);
    res.status(500).json({ message: 'Error en el servidor al crear el viaje.' });
  }
};

// GET /api/trips
// Obtener todos los viajes del usuario autenticado
export const getUserTrips = async (req, res) => {
  try {
    const userId = req.user.id;
    const trips = await Trip.findAll({
      where: { user_id: userId },
      include: [
        { model: Destination, as: 'destination' },
        { model: TripStatus, as: 'status' }
      ],
      order: [['start_date', 'ASC']]
    });
    res.json(trips);
  } catch (error) {
    console.error('Error al obtener los viajes del usuario:', error.message);
    res.status(500).json({ message: 'Error en el servidor al obtener los viajes.' });
  }
};

// GET /api/trips/next
// Obtener el siguiente viaje del usuario (el más cercano en el futuro)
export const getNextTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextTrip = await Trip.findOne({
      where: {
        user_id: userId,
        start_date: {
          [Sequelize.Op.gte]: today
        }
      },
      include: [
        { model: Destination, as: 'destination' },
        { model: TripStatus, as: 'status' }
      ],
      order: [['start_date', 'ASC']]
    });

    if (nextTrip) {
      res.json(nextTrip);
    } else {
      res.status(404).json({ message: 'No se encontraron viajes futuros para este usuario.' });
    }
  } catch (error) {
    console.error('Error al obtener el siguiente viaje:', error.message);
    res.status(500).json({ message: 'Error en el servidor al obtener el siguiente viaje.' });
  }
};

// GET /api/trips/:tripId
// Obtener detalle de un viaje específico
export const getTripDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tripId } = req.params;

    const trip = await Trip.findByPk(tripId, {
      where: { user_id: userId },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Destination, as: 'destination' },
        { model: TripStatus, as: 'status' }
      ]
    });

    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado o no pertenece a este usuario.' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Error al obtener el detalle del viaje:', error.message);
    res.status(500).json({ message: 'Error en el servidor al obtener el detalle del viaje.' });
  }
};

// PUT /api/trips/:tripId
// Actualizar un viaje específico
export const updateTrip = async (req, res) => {
  const { name, destination_id, start_date, end_date, budget, status_id, description, image_url } = req.body;
  const { tripId } = req.params;
  const userId = req.user.id;

  try {
    // Opcional: Validar que el destination_id y status_id existan si se están actualizando
    if (destination_id) {
      const destinationExists = await Destination.findByPk(destination_id);
      if (!destinationExists) {
        return res.status(400).json({ message: 'El destino especificado no existe.' });
      }
    }
    if (status_id) {
      const statusExists = await TripStatus.findByPk(status_id);
      if (!statusExists) {
        return res.status(400).json({ message: 'El estado de viaje especificado no existe.' });
      }
    }

    const [updatedRows] = await Trip.update(
      { name, destination_id, start_date, end_date, budget, status_id, description, image_url },
      {
        where: {
          id: tripId,
          user_id: userId // Asegura que solo el propietario del viaje pueda actualizarlo
        }
      }
    );

    if (updatedRows > 0) {
      const updatedTrip = await Trip.findByPk(tripId, {
        include: [
          { model: Destination, as: 'destination' },
          { model: TripStatus, as: 'status' }
        ]
      });
      res.json({ message: 'Viaje actualizado exitosamente.', trip: updatedTrip });
    } else {
      res.status(404).json({ message: 'Viaje no encontrado o no pertenece a este usuario.' });
    }
  } catch (error) {
    console.error('Error al actualizar el viaje:', error.message);
    res.status(500).json({ message: 'Error en el servidor al actualizar el viaje.' });
  }
};

// DELETE /api/trips/:tripId
// Borrar un viaje específico
export const deleteTrip = async (req, res) => {
  const { tripId } = req.params;
  const userId = req.user.id;

  try {
    const deletedRows = await Trip.destroy({
      where: {
        id: tripId,
        user_id: userId // Asegura que solo el propietario del viaje pueda borrarlo
      }
    });

    if (deletedRows > 0) {
      res.status(204).json({ message: 'Viaje eliminado exitosamente.' }); // 204 No Content
    } else {
      res.status(404).json({ message: 'Viaje no encontrado o no pertenece a este usuario.' });
    }
  } catch (error) {
    console.error('Error al borrar el viaje:', error.message);
    res.status(500).json({ message: 'Error en el servidor al borrar el viaje.' });
  }
};