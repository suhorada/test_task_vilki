const { findCategory, createCategory } = require('./category.query');

const postCategory = async (req, res) => {
  try {
    let response;
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(404).send({ msg: 'Body.name or body.description not found' });
    }
    const isExist = await findCategory(name, description);
    if (!isExist) {
      response = await createCategory(name, description);
      res.status(200).send({ msg: 'Category was created', data: response });
    } else {
      console.log(isExist);
      res.status(200).send({ msg: `Category already exist with id ${isExist.id}` });
    }
  } catch (err) {
    res.status(400).send({ msg: 'Request forbidden', error: err });
  }
};

module.exports = {
  postCategory,
};
