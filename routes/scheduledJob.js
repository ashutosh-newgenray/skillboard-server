var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

// /* GET All schedular jobs. */
// router.get("/", async (req, res, next) => {
//   const resp = await req.app.DB.collection("schedular_jobs").find({}).toArray();
//   res.json(resp);
// });

/* GET schedular job by id.*/
router.get("/j/:jobId", async (req, res, next) => {
  const resp = await req.app.DB.collection("schedular_jobs")
    .find({
      _id: ObjectId(req.params.jobId),
    })
    .toArray();
  res.json(resp);
});

module.exports = router;
