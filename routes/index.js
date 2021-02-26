var express = require("express");
var router = express.Router();

const seeder = require("../database/database_seeder");
/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Unbaised Skillboard" });
});

/* GET home page. */
router.get("/seeder", async (req, res, next) => {
  seeder(req.app.DB);
  res.render("index", { title: "Express" });
});

module.exports = router;
