const JobModel = require("../models/model");

const getJobs = async () => {
  return await JobModel.find().sort({ createdAt: -1 });
};

module.exports = {
  getJobs,
};
