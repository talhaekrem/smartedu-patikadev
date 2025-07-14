const express = require("express");
const courseController = require("../controllers/course.controller");

const router = express.Router();

router.route("/").post(courseController.createCourse);
router.route("/").get(courseController.coursesGetAll);
router.route("/:slug").get(courseController.coursesGetById);

module.exports = router;
