const express = require("express");
const authController = require("../controllers/auth.controller");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(isLoggedIn, authController.getDashboardPage);

module.exports = router;
