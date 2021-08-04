const { Category } = require('../models');

const postCategory = async (req, res) => {
  let response;
  try {
    const isExist = await Category.findOne({ where: { name: req.body.name } });
    if (!isExist) {
      const newCategory = await Category.build(
        { name: req.body.name, description: req.body.description },
      );
      response = await newCategory.save();
    } else res.status(200).send({ msg: `Category already exist with id ${isExist.id}` });
  } catch (err) {
    res.status(400).send(err);
  }
  res.status(200).send(response);
};

module.exports = {
  postCategory,
};
