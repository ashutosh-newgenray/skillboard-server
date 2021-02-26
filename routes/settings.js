var express = require("express");
var router = express.Router();

/* GET /settings/ */
router.get("/system", async (req, res, next) => {
  res.json({ weekdays: ["Monday", "Tuesday"] });
});

/* POST /settings/update */
router.get("/update", async (req, res, next) => {
  //Update the database
});

module.exports = router;
