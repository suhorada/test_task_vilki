const { Category } = require('../models');

const postCategory = async (req, res) => {
  // try {
  //   let response;
  //   const isExist = await Category.findOne({ where: { name: req.body.name } });
  //   if (!isExist) {
  //     const newCategory = await Category.build(
  //       { name: req.body.name, description: req.body.description },
  //     );
  //     response = await newCategory.save();
  //     res.status(200).send({ msg: 'Category was created', data: response });
  //   } else {
  //     res.status(200).send({ msg: `Category already exist with id ${isExist.id}` });
  //   }
  // } catch (err) {
  //   res.status(400).send(err);
  // }
};

module.exports = {
  postCategory,
};
