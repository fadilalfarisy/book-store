import Joi from "joi";

const createBlogValidation = Joi.object({
	title: Joi.string().max(100).required(),
	description: Joi.string().required(),
	category_id: Joi.string().required()
});

export {
	createBlogValidation,
}
