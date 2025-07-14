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

module.exports = {
  createCourse,
};
