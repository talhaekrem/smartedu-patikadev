const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");
//const mongoose = require("mongoose");

const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      user: req.session.userId,
    });
    req.flash("success", `${course.name} has been created successfully!`);
    res.status(201).redirect("/courses");
    // res.status(201).json({
    //   status: "success",
    //   response: "OK",
    //   course,
    // });
  } catch (error) {
    req.flash("error", `Something happened!`);
    res.status(400).redirect("/courses");
  }
};

const coursesGetAll = async (req, res) => {
  try {
    let categorySlug = req.query.category;
    let searchWords = req.query.search;
    let filter = { name: "", category: null };
    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      filter = { category: category._id };
    }

    if (searchWords) {
      filter = { name: searchWords };
    }
    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .populate("user")
      .sort({ createDate: -1 });
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
    const categories = await Category.find();

    res.status(200).render("course", {
      course,
      user,
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

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ slug: req.params.slug });
    await User.find({ courses: { $in: course } }).updateMany({
      $pull: { courses: course._id },
    });
    req.flash("success", `Course has been deleted successfully!`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `Something happened!`);
    res.status(400).redirect("/users/dashboard");
  }
};

module.exports = {
  createCourse,
  coursesGetAll,
  coursesGetById,
  enrollCourse,
  releaseCourse,
  deleteCourse,
};
