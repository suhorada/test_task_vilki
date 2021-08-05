const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
  }, {});
  User.beforeSave((user) => {
    if (user.changed('password')) {
      // eslint-disable-next-line no-param-reassign
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = (passw, pass, cb) => {
    bcrypt.compare(passw, pass, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      return cb(null, isMatch);
    });
  };
  User.associate = (models) => {
    User.hasMany(models.Vilka, {
      foreignKey: 'user_id',
    });
    User.hasOne(models.Subscribes, {
      foreignKey: 'user',
    });
  };
  return User;
};
