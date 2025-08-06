const getAboutPage = (req, res) => {
  res.status(200).render("about", {
    pageName: "about",
  });
};

const getHomePage = (req, res) => {
  res.status(200).render("index", {
    pageName: "index",
  });
};

const getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    pageName: "register",
  });
};

const getLoginPage = (req, res) => {
  res.status(200).render("login", {
    pageName: "login",
  });
};
module.exports = {
  getAboutPage,
  getHomePage,
  getRegisterPage,
  getLoginPage,
};
