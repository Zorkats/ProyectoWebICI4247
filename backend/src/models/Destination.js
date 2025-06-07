export default (sequelize, DataTypes) => {
  const Destination = sequelize.define('Destination', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    main_image_url: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'destinations',
    timestamps: true
  });

  Destination.associate = models => {
    Destination.belongsTo(models.DestinationCategory, { foreignKey: 'category_id', as: 'category' });
    Destination.hasMany(models.Trip, { foreignKey: 'destination_id' });
  };

  return Destination;
};