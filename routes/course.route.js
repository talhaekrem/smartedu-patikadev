const express = require("express");
const courseController = require("../controllers/course.controller");
const { checkRole } = require("../middlewares/roleMiddleware");
const router = express.Router();

router
  .route("/")
  .post(checkRole(["teacher", "admin"]), courseController.createCourse);
router.route("/").get(courseController.coursesGetAll);
router.route("/:slug").get(courseController.coursesGetById);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse);
router.route("/:slug").delete(courseController.deleteCourse);

module.exports = router;
