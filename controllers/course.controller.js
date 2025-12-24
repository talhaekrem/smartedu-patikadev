const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");
//const mongoose = require("mongoose");

const createCourse = async (req, res) => {
  try {
    await Course.create({ ...req.body, user: req.session.userId });
    res.status(201).redirect("/courses");
    // res.status(201).json({
    //   status: "success",
    //   response: "OK",
    //   course,
    // });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error,
    });
  }
};

const coursesGetAll = async (req, res) => {
  try {
    let categorySlug = req.query.category;
    let filter = {};
    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      filter = { category: category._id };
    }
    const courses = await Course.find(filter).sort({ createDate: -1 });
    const categories = await Category.find();
    res.status(200).render("courses", {
      courses,
      categories,
      pageName: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error,
    });
  }
};

const coursesGetById = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const user = await User.findById(req.session.userId);
    res.status(200).render("course", {
      course,
      user,
      pageName: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error,
    });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    user.courses.push({ _id: req.body.courseId });
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error,
    });
  }
};

const releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    user.courses.pull({ _id: req.body.courseId });
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error,
    });
  }
};

module.exports = {
  createCourse,
  coursesGetAll,
  coursesGetById,
  enrollCourse,
  releaseCourse,
};
