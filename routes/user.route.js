const express = require("express");
const authController = require("../controllers/auth.controller");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const { body } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .withMessage("Email is required")
      .custom(async (email) => {
        return await User.findOne({ email: email }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail already in use");
          }
        });
      }),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  authController.createUser
);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(isLoggedIn, authController.getDashboardPage);

module.exports = router;
