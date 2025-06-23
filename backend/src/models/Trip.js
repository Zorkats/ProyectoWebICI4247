export default (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    destination_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(2048),
      allowNull: true
    }
  }, {
    tableName: 'trips',
    timestamps: true,
    underscored: true
  });

  Trip.associate = models => {
    Trip.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Trip.belongsTo(models.Destination, { foreignKey: 'destination_id', as: 'destination' });
    Trip.belongsTo(models.TripStatus, { foreignKey: 'status_id', as: 'status' });
    Trip.hasMany(models.ItineraryItem, { foreignKey: 'trip_id', as: 'itineraryItems' });
  };

  return Trip;
};