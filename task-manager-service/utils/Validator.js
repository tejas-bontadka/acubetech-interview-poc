const Joi = require("@hapi/joi");

const schema = Joi.object({
  description: Joi.string().required(),
  status: Joi.string().required()
}).unknown(true);

module.exports = schema;