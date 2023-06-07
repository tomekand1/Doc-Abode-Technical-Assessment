const JobModel = require("../models/model");

const getJobs = async () => {
  return await JobModel.find().sort({ createdAt: -1 });
};

const postJob = async (request, h) => {
  return "";
};

module.exports = {
  getJobs,
  postJob,
};
