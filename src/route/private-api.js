import express from "express";
import multer from "multer";
import userController from "../controller/user-controller.js";
import companyController from "../controller/company-controller.js";
import bookController from "../controller/book-controller.js";
import { authAdmin } from "../middleware/auth-middleware.js";

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
// userRouter.use(authAdmin)
userRouter.get('/api/users', userController.getAllUsers)
userRouter.delete('/api/users/:id', userController.deleteUser)

// Company API
const companyRouter = new express.Router();
companyRouter.post('/api/company', companyController.createCompany);
companyRouter.get('/api/company', companyController.getCompany);

// Book API
const bookRouter = new express.Router();
bookRouter.post('/api/books', upload.single('cover_book'), bookController.createBook);
bookRouter.get('/api/books', bookController.getAllBooks);
bookRouter.get('/api/books/:id', bookController.getBookById);
bookRouter.put('/api/books/:id', upload.single('cover_book'), bookController.updateBook);
bookRouter.delete('/api/books/:id', bookController.deleteBook);

export {
	userRouter,
	companyRouter,
	bookRouter
}
