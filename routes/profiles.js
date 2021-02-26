var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

/* GET All Profiles. */
router.get("/", async (req, res, next) => {
  const resp = await req.app.DB.collection("profiles").find({}).toArray();
  res.json(resp);
});

/* GET Profile by id.*/
router.get("/u/:profileId", async (req, res, next) => {
  const resp = await req.app.DB.collection("profiles")
    .find({
      _id: ObjectId(req.params.profileId),
    })
    .toArray();

  res.json(resp);
});

/* Insert new  Profile. */
router.get("/add", function (req, res, next) {
  //req.app.DB.collection("profiles").insert(req.payload);
  res.render("index", { title: "Express" });
});

module.exports = router;
