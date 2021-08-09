const { createCategory, findCategoryByName } = require('./category.query');

const postCategory = async (req, res) => {
  try {
    let response;
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(404).send({ msg: 'Body.name or body.description not found' });
    }
    const foundCategory = await findCategoryByName(name);
    if (!foundCategory) {
      response = await createCategory(name, description);
      res.status(200).send(response);
    } else {
      res.status(200).send({ msg: `Category already exist with id ${foundCategory.id}` });
    }
  } catch (err) {
    res.status(400).send({ msg: 'Request forbidden', error: err });
  }
};

module.exports = {
  postCategory,
};
