const mongoose = require("mongoose");

const options = {
  toJSON: {
    transform: sanitizeOutput,
  },
};
let model = new Schema(
  {
    id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      },
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    priceInPence: {
      type: Number,
    },
    contactEmail: {
      type: String,
    },
    status: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: function getDate() {
        return new Date().toISOString();
      },
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  options
);

const JobModel = mongoose.model("jobs", model);

module.exports = JobModel;
