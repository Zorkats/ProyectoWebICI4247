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
    passwordHash: {         // camelCase en JS
      field: 'password_hash',
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePictureUrl: {    // camelCase en JS
      field: 'profile_picture_url',
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    roleId: {               // camelCase en JS
      field: 'role_id',
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'users',
    underscored: true,       // usa snake_case en BD
    timestamps: true
  });

  User.associate = models => {
    User.belongsTo(models.UserRole, { foreignKey: 'role_id', as: 'role' });
    User.hasMany(models.Trip, { foreignKey: 'user_id', as: 'trips' });
  };

  return User;
};