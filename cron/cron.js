var cron = require("node-cron"),
  dump = require("../handlers/dump"),
  cleanUp = require("../handlers/cleanup");

console.log("Task Started");

cron.schedule("30 0 * * *", () => {
  dump();
});

cron.schedule("0 22 * * *", () => {
  cleanUp();
});
