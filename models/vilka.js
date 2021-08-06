const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Fork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fork.belongsTo(models.Category, {
        foreignKey: 'category_id',
      });
      Fork.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Fork.hasOne(models.Subscribes, {
        foreignKey: 'category',
      });
    }
  }
  Fork.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    year: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Fork',
  });
  return Fork;
};