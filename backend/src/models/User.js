export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_picture_url: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  User.associate = models => {
    User.belongsTo(models.UserRole, { foreignKey: 'role_id', as: 'role' });
    User.hasMany(models.Trip, { foreignKey: 'user_id' });
  };

  return User;
};