var express = require("express");
var router = express.Router();
const chalk = require("chalk");
const { format } = require("date-fns");

let DB;
const log = console.log;

router.get("/", async (req, res, next) => {
  const resp = await req.app.DB.collection("schedular_jobs")
    .find({})
    .sort({ "feedback_for.emp_id": 1 })
    .toArray();
  res.render("jobs", { title: "Unbaised Skillboard", jobs: resp });
});

router.post("/schedule", async (req, res, next) => {
  DB = req.app.DB;
  res.redirect("/jobs");
});

async function main() {
  log(chalk.redBright("#### Get Schedular Jobs for sending Feedback ### "));
  const schedularJobs = await getJobsForFeedbacks();
  log(chalk.green("Schedular Jobs for sending Feedback"));
  log(schedularJobs);
  await updateSchedularJobs(schedularJobs);
}

/**
 *  List of Employees for whom feedbacks is required
 * argument :
 * return List of Employees ( Profile)
 */
async function getJobsForFeedbacks() {
  log("Get skills for Execution");
  const listOfSkillsForExecution = await getSkillForExecution();
  //TODO remove duplicate skills from array <listOfSkillsForExecution>

  let skill, skillGroups, skillProfiles, profiles;

  let schedularJobs = [];
  // Loop through skills
  log("Get Skill Groups for skills", listOfSkillsForExecution);
  for (let i in listOfSkillsForExecution) {
    skill = listOfSkillsForExecution[i];
    log("Update event calendar with skills for next event");
    updateTaskCalendar(skill);
    log("Get Skill Group for ", skill);
    skillGroups = await getSkillGroups(skill);
    // Todo remove duplicate from skillGroups;
    // Loop through skill groups
    log(chalk.blue("For each SkillGroup get Skill Profiles"));
    for (let j in skillGroups) {
      log(chalk.yellow(`Get skill Profile for ${skillGroups[j]}`));
      skillProfiles = await getSkillProfiles(skillGroups[j]);
      // Loop through skill Profiles
      log(chalk.blue("For each skill profile get profiles"));
      for (let k in skillProfiles) {
        let profileArr = await getProfiles(skillProfiles[k].profile_code);
        for (let l in profileArr) {
          log(chalk.red("> >"), profileArr);
          let profile = profileArr[l];
          let feedbackFrom = await getProfileToRequestFeedback(profile);
          schedularJobs.push({
            profile_code: skillProfiles[k].profile_code,
            group_code: skillGroups[j],
            skill_code: skill,
            feedback_for: profile,
            feedback_from: feedbackFrom,
            status: 0,
          });
        }
      }
    }
  }
  return schedularJobs;
}

/**
 * Get Skills for Today
 * Table: task_calendar
 */
async function getSkillForExecution() {
  log(chalk.blue("Get Skills from Event Calendar for today"));
  const resp = await DB.collection("event_calendar")
    .find(
      {
        event_date: format(new Date(), "dd-MM-yyyy"),
      },
      {
        projection: { _id: 0, skills: 1 },
      }
    )
    .map((item) => item.skills)
    .toArray();
  return resp.length ? resp[0] : [];
}

/**
 * Get Skills
 * Table: skills
 * arguments : skill code
 * return : skill
 */
async function getSkill(skillcode) {
  return new Promise((resolve, reject) => {
    resolve({
      skill_code: "html",
      skill_label: "HTML",
      feedback_frequency: "MONTHLY",
    });
  });
}
module.exports = router;

/**
 * Get Skill Group
 * Table: skill_groups
 * arguments : skill_code
 * return : Array skill_groups
 */

async function getSkillGroups(skillCode) {
  const resp = await DB.collection("skill_groups")
    .find(
      {
        skills: skillCode,
      },
      {
        projection: {
          _id: 0,
          group_code: 1,
        },
      }
    )
    .map((item) => item.group_code)
    .toArray();
  log(`Skill Groups for skill '${skillCode}'`, resp);
  //log(`getSkillGroups for ${skillCode} `, resp);
  return resp;
}

/**
 * Get Skill profiles
 * Table: skill_profiles
 * arguments : group_code
 * return : Array skill_profiles
 */

async function getSkillProfiles(groupCode) {
  const resp = await DB.collection("skill_profiles")
    .find({
      "skill_groups.skill_group_code": groupCode,
    })
    .toArray();
  log(
    "Got " +
      chalk.red(resp.length) +
      " SkillProfiles for " +
      chalk.green(groupCode)
  );
  return resp;
}

/**
 * Get Profile Ids
 * Table: profiles
 * arguments : profile_code
 * return : Array profiles
 */

async function getProfiles(profile_code) {
  const resp = await DB.collection("profiles")
    .find(
      {
        profile_code: profile_code,
      },
      {
        projection: {
          emp_id: 1,
          name: 1,
          email: 1,
          project_id: 1,
          profile_code: 1,
        },
      }
    )
    .toArray();
  log(
    `Got ${chalk.redBright(resp.length)} profiles for code ${chalk.green(
      profile_code
    )}`
  );
  return resp;
}

/**
 * Get Profile Ids
 * Table: profiles
 * arguments : profile_code
 * return : Array profiles
 */

async function getProfileToRequestFeedback(profile) {
  const resp = await DB.collection("profiles")
    .find(
      {
        project_id: profile.project_id,
        emp_id: { $ne: profile.emp_id },
      },
      {
        projection: {
          emp_id: 1,
          name: 1,
          email: 1,
        },
      }
    )
    .map((item) => ({ ...item, status: 0 }))
    .toArray();

  log(
    `Got ${chalk.redBright(
      resp.length
    )} profiles for requesting feedback on Project ${chalk.green(
      profile.project_id
    )} for Employee ${chalk.green(profile.emp_id)}`
  );
  return resp;
}

/**
 * Update Schedular_jobs Table with new job
 * @param {*} jobs Array
 */
async function updateSchedularJobs(jobs) {
  await DB.collection("schedular_jobs").drop();
  const resp = await DB.collection("schedular_jobs").insert(jobs);
  log(chalk.yellow(`Updated Schedular_jobs Table`));
  return resp;
}

/**
 * Mark the task_calendar for the skill with next date
 * return null;
 */
function updateTaskCalendar(skill) {}

module.exports = router;
