import express from "express";
import multer from "multer";
import userController from "../controller/user-controller.js";
import companyController from "../controller/company-controller.js";
import bookController from "../controller/book-controller.js";
import bookCategoryController from "../controller/bookCategory-controller.js";
import { authAdmin } from "../middleware/auth-middleware.js";
import blogController from "../controller/blog-controller.js";
import blogCategoryController from "../controller/blogCategory-controller.js";

const fileStorage = multer.diskStorage({
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}_${file.originalname}`)
	}
})

const fileFilter = (req, file, callback) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
		callback(null, true);
	} else {
		callback(null, false);
	}
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter })

// User API
const userRouter = new express.Router();
userRouter.get('/', userController.getAllUsers)
userRouter.delete('/:id', userController.deleteUser)

// Company API
const companyRouter = new express.Router();
companyRouter.post('/', companyController.createCompany);
companyRouter.get('/', companyController.getCompany);

// Book API
const bookRouter = new express.Router();
bookRouter.post('/', upload.single('cover_book'), bookController.createBook);
bookRouter.get('/', bookController.getAllBooks);
bookRouter.get('/:id', bookController.getBookById);
bookRouter.put('/:id', upload.single('cover_book'), bookController.updateBook);
bookRouter.delete('/:id', bookController.deleteBook);

// Category Book API
const bookCategoryRouter = new express.Router();
bookCategoryRouter.post('/', bookCategoryController.createBookCategory);
bookCategoryRouter.get('/', bookCategoryController.getAllBookCategories);
bookCategoryRouter.get('/:id', bookCategoryController.getBookCategoryById);
bookCategoryRouter.put('/:id', bookCategoryController.updateBookCategory);
bookCategoryRouter.delete('/:id', bookCategoryController.deleteBookCategory);

// Category Blog API
const blogCategoryRouter = new express.Router();
blogCategoryRouter.post('/', blogCategoryController.createBlogCategory);
blogCategoryRouter.get('/', blogCategoryController.getAllBlogCategories);
blogCategoryRouter.get('/:id', blogCategoryController.getBlogCategoryById);
blogCategoryRouter.put('/:id', blogCategoryController.updateBlogCategory);
blogCategoryRouter.delete('/:id', blogCategoryController.deleteBlogCategory);

// Blog API
const blogRouter = new express.Router();
blogRouter.post('/', upload.single('thumbnail'), blogController.createBlog);
blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getBlogById);
blogRouter.put('/:id', upload.single('thumbnail'), blogController.updateBlog);
blogRouter.delete('/:id', blogController.deleteBlog);

export {
	userRouter,
	companyRouter,
	bookRouter,
	bookCategoryRouter,
	blogRouter,
	blogCategoryRouter
}
