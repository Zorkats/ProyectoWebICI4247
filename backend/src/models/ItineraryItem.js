// models/itineraryItem.model.js
export default (sequelize, DataTypes) => {
  const ItineraryItem = sequelize.define('ItineraryItem', {
    // --- CAMPOS RELLENADOS ---
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trips', // Nombre de la tabla a la que hace referencia
        key: 'id'
      }
    },
    poi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'points_of_interest', // Nombre de la tabla a la que hace referencia
        key: 'id'
      }
    },
    day_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'El número del día en el itinerario (ej: 1, 2, 3...)'
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: true,
      comment: 'Hora de inicio de la actividad (ej: "10:00:00")'
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true,
      comment: 'Hora de fin de la actividad (ej: "12:00:00")'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Notas personales del usuario para esta actividad'
    }
    // No es necesario definir createdAt y updatedAt, Sequelize los añade si timestamps es true
  }, {
    // Opciones del modelo
    tableName: 'itinerary_items',
    timestamps: true,  // Habilita createdAt y updatedAt
    underscored: true  // Usa snake_case (ej. created_at) en lugar de camelCase
  });

  ItineraryItem.associate = models => {
    ItineraryItem.belongsTo(models.Trip, { foreignKey: 'trip_id', as: 'trip' });
    ItineraryItem.belongsTo(models.PointOfInterest, { foreignKey: 'poi_id', as: 'poi' });
  };

  return ItineraryItem;
};