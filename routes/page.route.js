const express = require("express");
const pageController = require("../controllers/page.controller");
const { redirectTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(pageController.getHomePage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(redirectTo, pageController.getRegisterPage);
router.route("/login").get(redirectTo, pageController.getLoginPage);

module.exports = router;
