const User = require("../models/User");
const Category = require("../models/Category");

//const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Course = require("../models/Course");
const { validationResult } = require("express-validator");

const createUser = async (req, res) => {
  let { password, ...rest } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ ...rest, password: hashedPassword });
    res.status(201).redirect("/login");
    // res.status(201).json({
    //   status: "success",
    //   response: "OK",
    //   user,
    // });
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", errors.array()[i].msg);
    }

    res.status(400).redirect("/register");
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err2, same) => {
        if (same) {
          req.session.userId = user._id;
          res.status(200).redirect("/users/dashboard");
          // res.status(200).json({
          //   status: "success",
          //   response: "OK",
          //   user,
          // });
        } else {
          req.flash("error", "Email or password is incorrect");
          res.status(400).redirect("/login");
        }
      });
    } else {
      req.flash("error", "Email or password is incorrect");
      res.status(400).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error,
    });
  }
};

const logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const getDashboardPage = async (req, res) => {
  const user = await User.findById(req.session.userId).populate("courses");
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userId });
  const users = await User.find();
  res.status(200).render("dashboard", {
    pageName: "dashboard",
    user,
    categories,
    courses,
    users,
  });
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    await Course.find({ user: { $in: user._id } }).deleteMany({
      user: user._id,
    });
    req.flash("success", `User has been deleted successfully!`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `Something happened!`);
    res.status(400).redirect("/users/dashboard");
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getDashboardPage,
  deleteUser,
};
