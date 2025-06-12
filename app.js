const express = require("express");

const app = express();

const PORT = 3000;

//Template engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes
app.get("/", (req, res) => {
  res.status(200).render("index", {
    pageName: "index",
  });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", {
    pageName: "about",
  });
});

app.listen(PORT, () => {
  console.log(`Uygulama ${PORT} portunda ayağa kaldırıldı...`);
});
