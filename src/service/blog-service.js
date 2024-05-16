import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createBlogValidation } from "../validation/blog-validation.js"
import { validate } from "../validation/validation.js"
import cloudinary from "./cloudinary-service.js"

const getAllBlogs = async (request) => {
  let search = {}
  let skip = 0
  let take = 9

  if (Number(request.query?.skip) === 'number') skip = Number(request.query?.skip)
  if (Number(request.query?.take) === 'number') take = Number(request.query?.take)

  if (request.query?.category_id) {
    search = {
      ...search,
      category_id: request.query.category_id
    }
  }

  if (request.query?.search) {
    search = {
      ...search,
      OR: [
        {
          title: {
            contains: request.query.search
          },
        },
        {
          description: {
            contains: request.query.search
          },
        },
      ],
    }
  }

  const [blogs, total] = await prismaClient.$transaction(async prisma => {
    const total = await prisma.blog.count({
      where: search
    });
    const blogs = await prisma.blog.findMany({
      where: search,
      include: {
        category: true
      },
      skip: skip,
      take: take,
    })

    return [blogs, total]
  })

  return {
    pagination: {
      total,
      take,
      skip,
    },
    blogs
  }
}

const getBlogById = async (request) => {
  const id = request.params.id

  const blog = await prismaClient.blog.findUnique({ where: { id: id } })
  if (!blog) throw new ResponseError(404, 'Blog not found')

  return blog
}

const createBlog = async (request) => {
  const blog = validate(createBlogValidation, request.body)

  if (!request.file) throw new ResponseError(400, '\"thumbnail\" is required')

  const uploadThumbnail = await cloudinary.uploader.upload(request.file.path)

  blog.thumbnail_id = uploadThumbnail.public_id
  blog.thumbnail = uploadThumbnail.secure_url

  return await prismaClient.blog.create({
    data: blog
  })
}

const updateBlog = async (request) => {
  const blog = validate(createBlogValidation, request.body)
  const id = request.params.id

  const oldBlog = await getBlogById(request)
  if (!request.file) {
    blog.thumbnail_id = oldBlog.public_id
    blog.thumbnail = oldBlog.secure_url
  } else {
    const uploadThumbnail = await cloudinary.uploader.upload(request.file.path)
    blog.thumbnail_id = uploadThumbnail.public_id
    blog.thumbnail = uploadThumbnail.secure_url
  }

  return await prismaClient.blog.update({
    where: {
      id: id
    },
    data: blog
  })
}

const deleteBlog = async (request) => {
  const id = request.params.id
  const blog = await getBlogById(request)

  await cloudinary.uploader.destroy(blog.thumbnail_id)
  await prismaClient.blog.delete({
    where: {
      id: id
    }
  })

  return 'Blog deleted successfully'
}

export default {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
}