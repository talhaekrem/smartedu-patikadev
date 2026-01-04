const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
//routes
const pageRoute = require("./routes/page.route");
const courseRoute = require("./routes/course.route");
const categoryRoute = require("./routes/category.route");
const userRoute = require("./routes/user.route");

const PORT = process.env.PORT || 5000;
const app = express();

//db connect
mongoose
  .connect("mongodb://localhost/smarteduDB")
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.log("ERROR", err));

//Template engine
app.set("view engine", "ejs");

//Global variables
global.userIn = null;

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "COK_gizli_BIR_keyY",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.MongoStore.create({
      mongoUrl: "mongodb://localhost/smarteduDB",
    }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//Routes
app.use(/(.*)/, (req, res, next) => {
  userIn = req.session.userId;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Uygulama ${PORT} portunda ayağa kaldırıldı...`);
});
