const JobModel = require("../model/model");

const getJobs = async () => {
  return await JobModel.find().sort({ createdAt: -1 });
};

module.exports = {
  getJobs,
};
