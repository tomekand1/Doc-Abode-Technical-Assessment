const Joi = require("joi");

const createNewJobRequestSchema = Joi.object({
  type: Joi.string()
    .required()
    .valid(...["ON_DEMAND", "SHIFT", "SCHEDULED"]),
  priceInPence: Joi.number().integer().required(),
  contactEmail: Joi.string().optional().email(),
  status: Joi.string()
    .required()
    .valid(...["AVAILABLE", "ASSIGNED", "COMPLETED"]),
}).options({ stripUnknown: true });

const getJobParamSchema = Joi.object({
  id: Joi.string().guid().required(),
});

const deleteJobParamSchema = Joi.object({
  id: Joi.string().guid().required(),
});

const patchJobRequestSchema = Joi.object({
  contactEmail: Joi.string().optional().email(),
  status: Joi.string()
    .required()
    .valid(...["AVAILABLE", "ASSIGNED", "COMPLETED"]),
}).options({ stripUnknown: true });

module.exports = {
  createNewJobRequestSchema,
  getJobParamSchema,
  deleteJobParamSchema,
  patchJobRequestSchema,
};
