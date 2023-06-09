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
  patchJobRequestSchema,
  deleteJobParamSchema,
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
    config: {
      validate: {
        options: {
          abortEarly: false,
        },
        payload: patchJobRequestSchema,
        failAction: (_request, _h, err) => {
          throw err;
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/jobs/{id}",
    handler: deleteJobById,
    config: {
      validate: {
        options: {
          abortEarly: false,
        },
        params: deleteJobParamSchema,
        failAction: (_request, _h, err) => {
          throw err;
        },
      },
    },
  },
];
