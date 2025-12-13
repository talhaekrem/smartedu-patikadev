const User = require("../models/User");

const isLoggedIn = async (req, res, next) => {
  try {
    let user = await User.findById(req.session.userId);
    if (!user) return res.redirect("/login");
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

const redirectTo = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/");
  }
  next();
};
module.exports = { isLoggedIn, redirectTo };
