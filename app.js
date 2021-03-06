var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var profileRouter = require("./routes/profiles");
var skillGroupRouter = require("./routes/skill_groups");
var skillRouter = require("./routes/skills");
var skillProfileRouter = require("./routes/skill_profiles");
var settingsRouter = require("./routes/settings");
var jobRouter = require("./routes/jobSchedular");
var scheduledJob = require("./routes/scheduledJob");
var questions = require("./routes/questions");
var feedback = require("./routes/feedback");

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/profiles", profileRouter);
app.use("/skills", skillRouter);
app.use("/skill_groups", skillGroupRouter);
app.use("/skill_profiles", skillProfileRouter);
app.use("/settings", settingsRouter);
app.use("/jobs", jobRouter);
app.use("/scheduledJob", scheduledJob);
app.use("/questions", questions);
app.use("/feedback", feedback);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
