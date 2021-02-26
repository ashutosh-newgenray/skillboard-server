const mainJob = (db) => {
  // This function is executed every minute
  console.log("Print ", new Date().getMinutes());
};
module.exports = mainJob;
