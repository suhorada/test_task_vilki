const { Vilka, Category } = require('../models');

// query = { page: number }
const list = async (req, res) => {
  const offset = (+req.query.page - 1) * +process.env.pageSize;
  const limit = +process.env.pageSize;
  let response;
  try {
    response = await Vilka.findAll({ limit, offset });
  } catch (err) {
    res.status(400).send(err);
  }
  res.status(200).send(response);
};

const postVilka = async (req, res) => {
  console.log(req.query);
  try {
    const categoryExist = await Category.findOne({ where: { name: req.query.category } });
    if (!categoryExist) {
      // Vilka.create({})
    } else {
      //
    }
  } catch (err) {
    res.status(400).send(err);
  }
  res.status(200).send('response');
};

module.exports = {
  list,
  postVilka,
};
