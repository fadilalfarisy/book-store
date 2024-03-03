import bookService from '../service/book-service.js'

const createBook = async (req, res, next) => {
	try {
		const result = await bookService.createBook(req);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const getAllBooks = async (req, res, next) => {
	try {
		const result = await bookService.getAllBooks(req);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const getBookById = async (req, res, next) => {
	try {
		const result = await bookService.getBookById(req.params.id);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const updateBook = async (req, res, next) => {
	try {
		const result = await bookService.updateBook(req);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}
const deleteBook = async (req, res, next) => {
	try {
		const result = await bookService.deleteBook(req.params.id);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

export default {
	getAllBooks,
	getBookById,
	createBook,
	updateBook,
	deleteBook
}