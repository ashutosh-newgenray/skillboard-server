var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

//save profile data from feedback
router.post("/save", async (req, res, next) => {
  try {
    const jobData = req.body.jobData;
    const feedbackFrom = jobData.feedback_from.filter(
      (item) => item._id.toString() === req.body.userId
    )[0].emp_id;
    await req.app.DB.collection("profiles").updateOne(
      {
        emp_id: jobData.feedback_for.emp_id,
      },
      {
        $push: {
          feedback: {
            emp_id: feedbackFrom,
            skill: jobData.skill_code,
            job_id: jobData._id,
            score: parseInt(req.body.payload["q-0"]),
            received_at: new Date().toString(),
          },
        },
      }
    );
    res.json({ status: 200, message: "profile updated" });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
