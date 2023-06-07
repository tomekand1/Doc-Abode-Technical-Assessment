const JobModel = require("../models/model");

const getJobs = async () => {
  return await JobModel.find().sort({ createdAt: -1 });
};

const postJob = async (request, h) => {
  const newJob = new JobModel(request.payload);
  const response = await newJob.save();
  return h.response(response).code(201);
};

const getJobById = async (request) => {
  const { id } = request.params;
  const [res] = await JobModel.find({ id });
  return res;
};

module.exports = {
  getJobs,
  postJob,
  getJobById,
};
