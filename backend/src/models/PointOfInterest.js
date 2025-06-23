// models/pointOfInterest.model.js
export default (sequelize, DataTypes) => {
  const PointOfInterest = sequelize.define('PointOfInterest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    destination_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    address: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8)
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8)
    },
    main_image_url: {
      type: DataTypes.STRING(2048)
    },
    gallery_image_urls: {
      type: DataTypes.JSON
    },
    average_rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    contact_info: {
      type: DataTypes.JSON
    }
  }, {
    tableName: 'points_of_interest',
    timestamps: true,
    underscored: true
  });

  // Define las asociaciones para este modelo
  PointOfInterest.associate = models => {
    PointOfInterest.belongsTo(models.Destination, {
      foreignKey: 'destination_id',
      as: 'destination'
    });
    PointOfInterest.belongsTo(models.PoiCategory, {
      foreignKey: 'category_id',
      as: 'category'
    });
    PointOfInterest.hasMany(models.ItineraryItem, { foreignKey: 'poi_id', as: 'itineraryItems' });
  };

  return PointOfInterest;
};