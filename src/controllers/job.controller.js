const Boom = require("@hapi/boom");
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
  if (res) {
    return res;
  } else {
    throw Boom.notFound(`No item found for id: ${id}`);
  }
};

const deleteJobById = async (request, h) => {
  const { id } = request.params;
  const res = await JobModel.deleteOne({ id });
  if (res.deletedCount > 0) {
    return `Item id: ${id} has been successfully deleted`;
  } else {
    return h.response().code(204);
  }
};

module.exports = {
  getJobs,
  postJob,
  getJobById,
  deleteJobById,
};
