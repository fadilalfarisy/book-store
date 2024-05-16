import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createCategoryValidation } from "../validation/category-validation.js"
import { validate } from "../validation/validation.js"

const getAllBookCategories = async () => {
  return await prismaClient.categoryBook.findMany({})
}

const getBookCategoryById = async (request) => {
  const id = request.params.id

  const bookCategory = await prismaClient.categoryBook.findUnique({ where: { id: id } })
  if (!bookCategory) throw new ResponseError(404, 'Category not found')

  return bookCategory
}

const createBookCategory = async (request) => {
  const bookCategory = validate(createCategoryValidation, request.body)

  return await prismaClient.categoryBook.create({
    data: bookCategory
  })
}

const updateBookCategory = async (request) => {
  const bookCategory = validate(createCategoryValidation, request.body)
  const id = request.params.id

  return await prismaClient.categoryBook.update({
    where: {
      id: id
    },
    data: bookCategory
  })
}

const deleteBookCategory = async (request) => {
  const id = request.params.id
  await getBookCategoryById(request)

  await prismaClient.categoryBook.delete({
    where: {
      id: id
    }
  })

  return 'Book Category deleted successfully'
}

export default {
  getAllBookCategories,
  getBookCategoryById,
  createBookCategory,
  updateBookCategory,
  deleteBookCategory
}