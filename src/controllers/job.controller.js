const JobModel = require("../models/model");

const getJobs = async () => {
  return await JobModel.find().sort({ createdAt: -1 });
};

const postJob = async (request, h) => {
  const newJob = new JobModel(request.payload);
  const response = await newJob.save();
  return h.response(response).code(201);
};

module.exports = {
  getJobs,
  postJob,
};
