var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

/* GET All Skill Groups. */
router.get("/", async (req, res, next) => {
  const resp = await req.app.DB.collection("skill_groups").find({}).toArray();
  res.json(resp);
});

/* GET Profile by id.*/
// router.get("/u/:profileId", async (req, res, next) => {
//   const resp = await req.app.DB.collection("skill_groups")
//     .find({
//       _id: ObjectId(req.params.profileId),
//     })
//     .toArray();

//   res.json(resp);
// });

/* Insert new  skill group. */
router.get("/add", function (req, res, next) {
    req.app.DB.collection("skill_groups").insert(req.payload);
  res.render("index", { title: "Express" });
});

module.exports = router;
