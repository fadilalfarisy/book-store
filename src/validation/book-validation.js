import Joi from "joi";

const createBookValidation = Joi.object({
	title: Joi.string().max(100).required(),
	description: Joi.string().required(),
	author: Joi.string().max(100).required(),
	class: Joi.string().max(100).required(),
	size: Joi.string().max(50).required(),
	ISBN: Joi.string().max(50).required(),
	publish_year: Joi.number().required(),
	page: Joi.number().required(),
	link_shopee: Joi.string().default(null),
	link_tokopedia: Joi.string().default(null),
	price: Joi.number().required(),
	category_id: Joi.string().required()
});

export {
	createBookValidation,
}
