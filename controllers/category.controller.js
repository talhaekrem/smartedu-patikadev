const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    await Category.create(req.body);
    req.flash("success", `Category has been created successfully!`);
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `Something happened!`);
    res.status(400).redirect("/users/dashboard");
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.params.id });
    req.flash("success", `Category has been deleted successfully!`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `Something happened!`);
    res.status(400).redirect("/users/dashboard");
  }
};
module.exports = {
  createCategory,
  deleteCategory,
};
