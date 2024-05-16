import supertest from "supertest"
import { web } from "../src/application/web.js";
import { createBlogCategory, removeBlogCategories } from "./test-util.js";

describe('Create Blog Category', () => {
	afterEach(async () => {
		await removeBlogCategories()
	})
	it('should can create blog category', async () => {
		const result = await supertest(web)
			.post('/api/blogs/categories')
			.send({
				category: 'Event'
			});
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.category).toBe('Event');
	})
})

describe('Get All Blog Categories', () => {
	it('should can get all blog categories', async () => {
		const result = await supertest(web).get('/api/blogs/categories')
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data).toEqual(expect.any(Array));
	})
})

describe('Get Blog Category by Id', () => {

	afterEach(async () => {
		await removeBlogCategories()
	})
	it('should can get blog category by id', async () => {
		const blogCategory = await createBlogCategory()
		const result = await supertest(web).get(`/api/blogs/categories/${blogCategory.id}`)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.category).toBe('Article');
	})
})

describe('Update Blog Category', () => {
	afterEach(async () => {
		await removeBlogCategories()
	})
	it('should can update blog category by id', async () => {
		const blogCategory = await createBlogCategory()
		const result = await supertest(web)
			.put(`/api/blogs/categories/${blogCategory.id}`)
			.send({
				category: 'Event'
			});
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.category).toBe('Event');
	})
})

describe('Delete Blog Category', () => {
	afterEach(async () => {
		await removeBlogCategories()
	})
	it('should can delete blog category by id', async () => {
		const blogCategory = await createBlogCategory()
		const result = await supertest(web).delete(`/api/blogs/categories/${blogCategory.id}`)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('Blog Category deleted successfully');
	})
})