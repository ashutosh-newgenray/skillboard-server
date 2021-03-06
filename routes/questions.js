var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

// /* GET All schedular jobs. */
// router.get("/", async (req, res, next) => {
//   const resp = await req.app.DB.collection("schedular_jobs").find({}).toArray();
//   res.json(resp);
// });

/* GET questions by skill.*/
router.get("/s/:skill", async (req, res, next) => {
  const resp = await req.app.DB.collection("feedback_questions")
    .find({
      skill: req.params.skill,
    })
    .toArray();
  res.json(resp);
});

module.exports = router;
