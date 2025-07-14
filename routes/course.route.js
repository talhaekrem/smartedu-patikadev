const express = require("express");
const courseController = require("../controllers/course.controller");

const router = express.Router();

router.route("/").post(courseController.createCourse);

module.exports = router;
