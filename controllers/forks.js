const addForMailing = require('../services/subscribe');

const list = async (req, res) => {
  // const offset = (Number(req.query.page) - 1) * Number(process.env.PAGE_SIZE);
  // const limit = Number(process.env.PAGE_SIZE);
  // if (!req.query.category) {
  //   let response;
  //   try {
  //     response = await Fork.findAll({ limit, offset });
  //   } catch (err) {
  //     if (!offset || !limit) {
  //       res.status(400).send({ msg: 'Page not found in query' });
  //     } else {
  //       res.status(400).send(err);
  //     }
  //   }
  //   res.status(200).send(response);
  // } else {
  //   const category = await Category.findOne({ where: { name: req.query.category } });
  //   let response;
  //   if (category) {
  //     try {
  //       response = await Fork.findAll({ where: { category_id: category.id }, limit, offset });
  //       res.status(200).send(response);
  //     } catch (err) {
  //       if (!offset || !limit) {
  //         res.status(400).send({ msg: 'Page not found in query' });
  //       } else {
  //         res.status(400).send(err);
  //       }
  //     }
  //   } else res.status(404).send(`Category ${req.query.category} not found`);
  // }
};
// ------------------------
// ------------------------
// ------------------------

const postFork = async (req, res) => {
  // try {
  //   // ------------------------
  //   const categoryExist = await Category.findOne({ where: { name: req.query.category } });
  //   if (categoryExist) {
  //     // ------------------------
  //     Fork.create({
  //       user_id: req.decoded.id,
  //       category_id: categoryExist.id,
  //       year: req.body.year,
  //       name: req.body.name,
  //       description: req.body.description,
  //     });
  //     // ------------------------
  //     const items = await Subscribes.findAll({
  //       where: {
  //         category: categoryExist.id,
  //       },
  //       attributes: ['id', 'user', 'category'],
  //       include: [{ model: User, attributes: ['login'] }],
  //     });
  //     const users = items.map((el) => el.dataValues.User.dataValues.login);
  //     addForMailing(categoryExist.name, users);
  //     res.status(201).send({ categoryExist });
  //   } else {
  //     res.status(404).send({ categoryExist, msg: 'Category not found, please, create a category' });
  //   }
  // } catch (err) {
  //   res.status(400).send(err);
  // }
};

module.exports = {
  list,
  postFork,
};
