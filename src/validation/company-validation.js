import Joi from "joi";

const createCompanyValidation = Joi.object({
	name: Joi.string().max(100).required(),
	industry: Joi.string().max(100).required(),
	description: Joi.string().required(),
	vision: Joi.string().required(),
	mission: Joi.string().required(),
});

export {
	createCompanyValidation
}
