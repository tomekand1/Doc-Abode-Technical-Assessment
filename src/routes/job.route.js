const {
  getJobs,
  postJob,
  getJobById,
  patchJobById,
  deleteJobById,
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
  {
    method: "PATCH",
    path: "/jobs/{id}",
    handler: patchJobById,
  },
  {
    method: "DELETE",
    path: "/jobs/{id}",
    handler: deleteJobById,
  },
];
