const { getJobs } = require("../controllers/job.controller");

module.exports = [
  {
    method: "GET",
    path: "/jobs",
    handler: getJobs,
  },
];
