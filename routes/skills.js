var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/settings", async (req, res, next) => {
  const skills = await req.app.DB.collection("skills").find({}).toArray();
  const skillProfiles = await req.app.DB.collection("skill_profiles")
    .find({})
    .toArray();
  res.json({ skills, skillProfiles });
  res.json({});
});

module.exports = router;
