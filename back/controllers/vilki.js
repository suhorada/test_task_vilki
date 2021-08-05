const { Vilka, Category } = require('../models');

const list = async (req, res) => {
  const offset = (+req.query.page - 1) * +process.env.pageSize;
  const limit = +process.env.pageSize;
  if (!req.query.category) {
    let response;
    try {
      response = await Vilka.findAll({ limit, offset });
    } catch (err) {
      if (!offset || !limit) {
        res.status(400).send({ msg: 'Page not found in query' });
      } else {
        res.status(400).send(err);
      }
    }
    res.status(200).send(response);
  } else {
    const category = await Category.findOne({ where: { name: req.query.category } });
    let response;
    if (category) {
      try {
        response = await Vilka.findAll({ where: { category_id: category.id }, limit, offset });
        res.status(200).send(response);
      } catch (err) {
        if (!offset || !limit) {
          res.status(400).send({ msg: 'Page not found in query' });
        } else {
          res.status(400).send(err);
        }
      }
    } else res.status(404).send(`Category ${req.query.category} not found`);
  }
};

const postVilka = async (req, res) => {
  try {
    const categoryExist = await Category.findOne({ where: { name: req.query.category } });
    if (categoryExist) {
      Vilka.create({
        user_id: req.decoded.id,
        category_id: categoryExist.id,
        year: req.body.year,
        name: req.body.name,
        description: req.body.description,
      });
      res.status(201).send({ categoryExist });
    } else {
      res.status(404).send({ categoryExist, msg: 'Category not found, please, create a category' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  list,
  postVilka,
};
