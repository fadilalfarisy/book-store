import Joi from "joi";

const createBookValidation = Joi.object({
	title: Joi.string().max(100).required(),
	description: Joi.string().required(),
	author: Joi.string().max(100).required(),
	target: Joi.string().max(100).required(),
	page: Joi.number().required(),
	size: Joi.string().max(50).required(),
	ISBN: Joi.string().max(50).required(),
	link_shopee: Joi.string().default(null),
	link_tokopedia: Joi.string().default(null),
	price: Joi.number().required()
});

export {
	createBookValidation,
}
