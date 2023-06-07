const {
  getJobs,
  postJob,
  getJobById,
} = require("../controllers/job.controller");

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
  {
    method: "GET",
    path: "/jobs/{id}",
    handler: getJobById,
  },
];
