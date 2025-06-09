export default (sequelize, DataTypes) => {
  const TripStatus = sequelize.define('TripStatus', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'trip_statuses',
    timestamps: true,
    underscored: true
  });

  TripStatus.associate = models => {
    TripStatus.hasMany(models.Trip, { foreignKey: 'status_id' });
  };

  return TripStatus;
};