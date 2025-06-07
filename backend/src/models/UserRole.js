export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
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
    tableName: 'user_roles',
    timestamps: true
  });

  UserRole.associate = models => {
    UserRole.hasMany(models.User, { foreignKey: 'role_id' });
  };

  return UserRole;
};