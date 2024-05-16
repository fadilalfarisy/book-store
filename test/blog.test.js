import supertest from "supertest"
import { web } from "../src/application/web.js";
import { createBlog, createBlogCategory, removeBlogs, removeBlogCategories } from "./test-util.js";
import cloudinary from "../src/service/cloudinary-service.js";

describe('Create Blog', () => {
	afterEach(async () => {
		await removeBlogs()
	})
	it('should can create blog', async () => {
		const category = await createBlogCategory()
		const result = await supertest(web)
			.post('/api/blogs')
			.attach('thumbnail', 'D:/Portofolio/book-store/test/telephone.jpg')
			.field({
				title: 'BERITA',
				description: 'Lorem ipsum',
				category_id: category.id
			});
		await cloudinary.uploader.destroy(result.body.data.thumbnail_id)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.title).toBe('BERITA');
		expect(result.body.data.description).toBe('Lorem ipsum');
	})
})

describe('Get All Blogs', () => {
	it('should can get all blogs', async () => {
		const result = await supertest(web).get('/api/blogs')
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.blogs).toEqual(expect.any(Array));
	})
})

describe('Get Blog by Id', () => {

	afterEach(async () => {
		await removeBlogs()
	})
	it('should can get blog by id', async () => {
		const blog = await createBlog()
		const result = await supertest(web).get(`/api/blogs/${blog.id}`)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.title).toBe('BLOG TEST');
	})
})

describe('Update Blog', () => {
	afterEach(async () => {
		await removeBlogs()
		await removeBlogCategories()
	})
	it('should can update blog by id', async () => {
		const blog = await createBlog()
		const category = await createBlogCategory()
		const result = await supertest(web)
			.put(`/api/blogs/${blog.id}`)
			.send({
				title: 'UPDATED TEST',
				description: "Lorem Ipsum",
				category_id: category.id
			});
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.title).toBe('UPDATED TEST');
	})
})

describe('Delete Blog', () => {
	afterEach(async () => {
		await removeBlogs()
	})
	it('should can delete blog by id', async () => {
		const blog = await createBlog()
		const result = await supertest(web).delete(`/api/blogs/${blog.id}`)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('Blog deleted successfully');
	})
})