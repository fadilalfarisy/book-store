import categoryService from '../service/bookCategory-service.js';

const createBookCategory = async (req, res, next) => {
  try {
    const result = await categoryService.createBookCategory(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const getAllBookCategories = async (req, res, next) => {
  try {
    const result = await categoryService.getAllBookCategories(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const getBookCategoryById = async (req, res, next) => {
  try {
    const result = await categoryService.getBookCategoryById(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const updateBookCategory = async (req, res, next) => {
  try {
    const result = await categoryService.updateBookCategory(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}
const deleteBookCategory = async (req, res, next) => {
  try {
    const result = await categoryService.deleteBookCategory(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export default {
  getAllBookCategories,
  getBookCategoryById,
  createBookCategory,
  updateBookCategory,
  deleteBookCategory
}