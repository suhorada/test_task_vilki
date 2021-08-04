const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vilka extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vilka.belongsTo(models.Category, {
        foreignKey: 'category_id',
      });
      Vilka.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Vilka.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    year: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Vilka',
  });
  return Vilka;
};
