// models/poiCategory.model.js
export default (sequelize, DataTypes) => {
  const PoiCategory = sequelize.define('PoiCategory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    icon_name: {
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'poi_categories',
    timestamps: true,
    underscored: true
  });

  // Define las asociaciones para este modelo
  PoiCategory.associate = models => {
    PoiCategory.hasMany(models.PointOfInterest, { 
      foreignKey: 'category_id', 
      as: 'pois' 
    });
  };

  return PoiCategory;
};