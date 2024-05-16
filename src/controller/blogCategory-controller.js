import blogCategoryService from '../service/blogCategory-service.js';

const createBlogCategory = async (req, res, next) => {
  try {
    const result = await blogCategoryService.createBlogCategory(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const getAllBlogCategories = async (req, res, next) => {
  try {
    const result = await blogCategoryService.getAllBlogCategories(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const getBlogCategoryById = async (req, res, next) => {
  try {
    const result = await blogCategoryService.getBlogCategoryById(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const updateBlogCategory = async (req, res, next) => {
  try {
    const result = await blogCategoryService.updateBlogCategory(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}
const deleteBlogCategory = async (req, res, next) => {
  try {
    const result = await blogCategoryService.deleteBlogCategory(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export default {
  getAllBlogCategories,
  getBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory
}