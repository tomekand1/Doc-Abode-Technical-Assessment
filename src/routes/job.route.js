const {
  getJobs,
  postJob,
  getJobById,
  patchJobById,
  deleteJobById,
} = require("../controllers/job.controller");
const {
  createNewJobRequestSchema,
  getJobParamSchema,
} = require("./validation/jobs.schema");

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
    config: {
      validate: {
        options: {
          abortEarly: false,
        },
        payload: createNewJobRequestSchema,
        failAction: (_request, _h, err) => {
          throw err;
        },
      },
    },
  },
  {
    method: "GET",
    path: "/jobs/{id}",
    handler: getJobById,
    config: {
      validate: {
        options: {
          abortEarly: false,
        },
        params: getJobParamSchema,
        failAction: (_request, _h, err) => {
          throw err;
        },
      },
    },
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
