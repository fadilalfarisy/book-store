import blogService from '../service/blog-service.js'

const createBlog = async (req, res, next) => {
  try {
    const result = await blogService.createBlog(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const getAllBlogs = async (req, res, next) => {
  try {
    const result = await blogService.getAllBlogs(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const getBlogById = async (req, res, next) => {
  try {
    const result = await blogService.getBlogById(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const updateBlog = async (req, res, next) => {
  try {
    const result = await blogService.updateBlog(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}
const deleteBlog = async (req, res, next) => {
  try {
    const result = await blogService.deleteBlog(req);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export default {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
}