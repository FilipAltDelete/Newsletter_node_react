var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/Admin");
var createUserRouter = require("./routes/CreateUser");
var updateUserRouter = require("./routes/UpdateUser");

var app = express();

var admin = [
  {
    username: "test",
    password: "1234",
  },
];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//app.set("view-engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*

app.get("/AdminLogin", (req, res) => {
  res.render("AdminSignIn.ejs");
});
app.post("/AdminLogin", (req, res) => {});
app.get("/AdminPage", (req, res) => {
  res.render("AdminPage.ejs", { name: "Kyle" });
});
*/

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/Admin", adminRouter);
app.use("/CreateUser", createUserRouter);
app.use("/UpdateUser", updateUserRouter);

module.exports = app;
