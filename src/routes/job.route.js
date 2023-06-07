const { getJobs, postJob } = require("../controllers/job.controller");

module.exports = [
  {
    method: "GET",
    path: "/jobs",
    handler: getJobs,
  },
  {
    method: "POST",
    path: "/jobs",
    handler: postJob,
  },
];
