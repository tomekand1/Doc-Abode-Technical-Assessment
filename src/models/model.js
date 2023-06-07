const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { v4: uuidv4 } = require("uuid");
const { omit } = require("lodash");

/* c8 ignore start */
(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
})();

const Schema = mongoose.Schema;

const sanitizeOutput = (_doc, obj) => {
  return omit(obj, ["__v", "_id"]);
};
/*c8 ignore end */

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
