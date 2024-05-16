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

const emailValidation = Joi.object({
	email: Joi.string().email().required()
});

const resetPasswordValidation = Joi.object({
	password: Joi.string().max(100).required()
});

export {
	registerUserValidation,
	loginUserValidation,
	emailValidation,
	resetPasswordValidation
}
