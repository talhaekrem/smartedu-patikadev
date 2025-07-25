const Category = require("../models/Category");
const Course = require("../models/Course");
//const mongoose = require("mongoose");

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      response: "OK",
      course,
    });
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
    const courses = await Course.find(filter);
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
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render("course", {
      course,
      pageName: "courses",
    });
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
};
