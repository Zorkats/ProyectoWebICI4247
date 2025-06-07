export default (sequelize, DataTypes) => {
  const DestinationCategory = sequelize.define('DestinationCategory', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon_url: {
      type: DataTypes.STRING(2048),
      allowNull: true
    }
  }, {
    tableName: 'destination_categories',
    timestamps: true
  });

  DestinationCategory.associate = models => {
    DestinationCategory.hasMany(models.Destination, { foreignKey: 'category_id' });
  };

  return DestinationCategory;
};