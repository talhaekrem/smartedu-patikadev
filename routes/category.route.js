const express = require("express");
const categoryController = require("../controllers/category.controller");

const router = express.Router();

router.route("/").post(categoryController.createCategory);
// router.route("/").get(categoryController.coursesGetAll);
// router.route("/:slug").get(categoryController.coursesGetById);

module.exports = router;
