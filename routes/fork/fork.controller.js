const addForMailing = require('../../services/subscribe');
const { allForks, allForksInCategory, createFork } = require('./fork.query');
const { findCategoryByName } = require('../category/category.query');
const { findSubscribers } = require('../subscribe/subscribes.query');

const list = async (req, res) => {
  const { page, category } = req.query;
  const offset = (Number(page) - 1) * Number(process.env.PAGE_SIZE);
  const limit = Number(process.env.PAGE_SIZE);
  try {
    const { name } = req.body;
    if (!category) {
      const response = await allForks(limit, offset);
      res.status(200).send(response);
    } else {
      const foundCategory = await findCategoryByName(name);
      let response;
      if (foundCategory) {
        response = await allForksInCategory(foundCategory.id, limit, offset);
        res.status(200).send(response);
      } else res.status(404).send(`Category ${category} not found`);
    }
  } catch (err) {
    if (typeof offset !== 'number' || typeof limit !== 'number') {
      res.status(404).send({ msg: 'Page not found in query' });
    } else if (!offset || !limit) {
      res.status(404).send({ msg: 'Page not found in query' });
    } else {
      res.status(400).send({ msg: 'Server error', error: err.toString() });
    }
  }
};

const postFork = async (req, res) => {
  try {
    const { name, year, description } = req.body;
    const { category } = req.query;
    const { id } = req.decoded;
    if (!category) {
      res.status(404).send({ msg: 'Name in query not found' });
    }
    const categoryExist = await findCategoryByName(category);
    if (categoryExist) {
      const response = await createFork({
        user_id: id,
        category_id: categoryExist.id,
        year,
        name,
        description,
      });

      // send notifications
      const items = await findSubscribers(categoryExist.id);
      const users = items.map((el) => el.dataValues.User.dataValues.login);
      addForMailing(categoryExist.name, users);

      res.status(201).send({ msg: 'Fork was created', data: response });
    } else {
      res.status(404).send({ msg: 'Category not found, please, create a category', categoryExist });
    }
  } catch (err) {
    res.status(400).send({ msg: 'Server error', error: err.toString() });
  }
};

module.exports = {
  list,
  postFork,
};
