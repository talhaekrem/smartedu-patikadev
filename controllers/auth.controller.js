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

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err2, same) => {
        if (same) {
          res.status(200).json({
            status: "success",
            response: "OK",
            user,
          });
        } else {
          res.status(401).json({
            status: "error",
            response: "kullanıcı adı veya şifre yanlış",
          });
        }
      });
    } else {
      res.status(401).json({
        status: "error",
        response: "kullanıcı adı veya şifre yanlış",
      });
    }
  } catch (error) {
    console.log("bura", error);
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
  loginUser,
};
