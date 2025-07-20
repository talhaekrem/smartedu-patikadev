const express = require("express");
const mongoose = require("mongoose");

const pageRoute = require("./routes/page.route");
const courseRoute = require("./routes/course.route");
const categoryRoute = require("./routes/category.route");
const userRoute = require("./routes/user.route");

const PORT = 3000;
const app = express();

//db connect
mongoose
  .connect("mongodb://localhost/smarteduDB")
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.log("ERROR", err));

//Template engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Uygulama ${PORT} portunda ayağa kaldırıldı...`);
});
