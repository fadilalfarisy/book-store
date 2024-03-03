import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createBookValidation } from "../validation/book-validation.js"
import { validate } from "../validation/validation.js"
import cloudinary from "./cloudinary-service.js"

const getAllBooks = async () => {
	return await prismaClient.book.findMany({
		where: {
			title: {
				endsWith: 'prisma.io',
			},
			posts: {
				some: {
					published: true,
				},
			},
		},
	})
}

const getBookById = async (request) => {
	const id = request

	const book = await prismaClient.book.findUnique({ where: { id: id } })
	if (!book) throw new ResponseError(404, 'Book not found')

	return book
}

const createBook = async (request) => {
	const book = validate(createBookValidation, request.body)

	if (!request.file) throw new ResponseError(400, '\"cover_book\" is required')

	const uploadCoverBook = await cloudinary.uploader.upload(request.file.path)

	book.cover_book_id = uploadCoverBook.public_id
	book.cover_book = uploadCoverBook.secure_url

	return await prismaClient.book.create({
		data: book
	})
}

const updateBook = async (request) => {
	const book = validate(createBookValidation, request.body)
	const id = request.params.id

	const oldBook = await getBookById(id)
	if (!request.file) {
		book.cover_book_id = oldBook.public_id
		book.cover_book = oldBook.secure_url
	} else {
		const uploadCoverBook = await cloudinary.uploader.upload(request.file.path)
		book.cover_book_id = uploadCoverBook.public_id
		book.cover_book = uploadCoverBook.secure_url
	}

	return await prismaClient.book.update({
		where: {
			id: id
		},
		data: book
	})
}

const deleteBook = async (request) => {
	const id = request
	const book = await getBookById(id)

	await cloudinary.uploader.destroy(book.cover_book_id)
	await prismaClient.book.delete({
		where: {
			id: id
		}
	})

	return 'Book deleted successfully'
}

export default {
	getAllBooks,
	getBookById,
	createBook,
	updateBook,
	deleteBook
}