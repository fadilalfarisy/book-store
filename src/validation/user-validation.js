import Joi from "joi";

const registerUserValidation = Joi.object({
	email: Joi.string().email().required(),
	username: Joi.string().max(100).required(),
	password: Joi.string().max(100).required(),
	role: Joi.valid('USER', 'ADMIN').required(),
});

const loginUserValidation = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().max(100).required()
});

const deleteUserValidation = Joi.object({ id: Joi.string().required() });

export {
	registerUserValidation,
	loginUserValidation,
	deleteUserValidation
}
