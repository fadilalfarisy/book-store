import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createCategoryValidation } from "../validation/category-validation.js"
import { validate } from "../validation/validation.js"

const getAllBlogCategories = async () => {
  return await prismaClient.categoryBlog.findMany({})
}

const getBlogCategoryById = async (request) => {
  const id = request.params.id

  const blogCategory = await prismaClient.categoryBlog.findUnique({ where: { id: id } })
  if (!blogCategory) throw new ResponseError(404, 'Blog Category not found')

  return blogCategory
}

const createBlogCategory = async (request) => {
  const blogCategory = validate(createCategoryValidation, request.body)

  return await prismaClient.categoryBlog.create({
    data: blogCategory
  })
}

const updateBlogCategory = async (request) => {
  const blogCategory = validate(createCategoryValidation, request.body)
  const id = request.params.id

  return await prismaClient.categoryBlog.update({
    where: {
      id: id
    },
    data: blogCategory
  })
}

const deleteBlogCategory = async (request) => {
  const id = request.params.id
  await getBlogCategoryById(request)

  await prismaClient.categoryBlog.delete({
    where: {
      id: id
    }
  })

  return 'Blog Category deleted successfully'
}

export default {
  getAllBlogCategories,
  getBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory
}