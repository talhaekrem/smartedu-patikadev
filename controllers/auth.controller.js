const User = require("../models/User");
//const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  let { password, ...rest } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ ...rest, password: hashedPassword });
    res.status(201).json({
      status: "success",
      response: "OK",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error,
    });
  }
};

// const coursesGetAll = async (req, res) => {
//   try {
//     let categorySlug = req.query.category;
//     let filter = {};
//     if (categorySlug) {
//       const category = await Category.findOne({ slug: categorySlug });
//       filter = { category: category._id };
//     }
//     const courses = await Course.find(filter);
//     const categories = await Category.find();
//     res.status(200).render("courses", {
//       courses,
//       categories,
//       pageName: "courses",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       response: error,
//     });
//   }
// };

// const coursesGetById = async (req, res) => {
//   try {
//     const course = await Course.findOne({ slug: req.params.slug });
//     res.status(200).render("course", {
//       course,
//       pageName: "courses",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       response: error,
//     });
//   }
// };

module.exports = {
  createUser,
};
