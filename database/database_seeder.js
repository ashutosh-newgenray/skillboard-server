const TABLES = [
  "skills",
  "skill_groups",
  "skill_profiles",
  "event_calendar",
  "profiles",
  "feedback_questions",
];

const seeder = function (db) {
  try {
    TABLES.forEach(async (item) => {
      const data = require(`./${item}.json`);
      await db.collection(item).drop();
      await db.createCollection(item);
      db.collection(item).insert(data);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = seeder;
