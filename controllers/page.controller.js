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

module.exports = {
  getAboutPage,
  getHomePage,
};
