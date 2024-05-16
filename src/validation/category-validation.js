import Joi from "joi";

const createCategoryValidation = Joi.object({
  category: Joi.string().max(50).required(),
});

export {
  createCategoryValidation
}
