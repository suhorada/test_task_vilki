const {
  Model,
} = require('sequelize');

module.exports = (sequelize) => {
  class Subscribes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Subscribes.hasOne(models.Category, {
      //   foreignKey: 'category',
      // });
      Subscribes.belongsTo(models.User, {
        foreignKey: 'user',
      });
    }
  }
  Subscribes.init({
    // user: DataTypes.INTEGER,
    // category: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Subscribes',
  });
  return Subscribes;
};
