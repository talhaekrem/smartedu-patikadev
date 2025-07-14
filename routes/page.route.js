const express = require("express");
const pageController = require("../controllers/page.controller");

const router = express.Router();

router.route("/").get(pageController.getHomePage);
router.route("/about").get(pageController.getAboutPage);

module.exports = router;
