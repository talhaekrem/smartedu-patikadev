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
module.exports = {
  getAboutPage,
  getHomePage,
  getRegisterPage,
};
