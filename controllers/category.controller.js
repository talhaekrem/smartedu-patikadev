const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      response: "OK",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error,
    });
  }
};

module.exports = {
  createCategory,
};
