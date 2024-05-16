import supertest from "supertest"
import { web } from "../src/application/web.js";
import { createCategoryBook, removeBookCategories } from "./test-util.js";

describe('Create Book Category', () => {
	afterEach(async () => {
		await removeBookCategories()
	})
	it('should can create book category', async () => {
		const result = await supertest(web)
			.post('/api/books/categories')
			.send({
				category: 'Biologi'
			});
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.category).toBe('Biologi');
	})
})

describe('Get All Book Categories', () => {
	it('should can get all book categories', async () => {
		const result = await supertest(web).get('/api/books/categories')
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data).toEqual(expect.any(Array));
	})
})

describe('Get Category by Id', () => {

	afterEach(async () => {
		await removeBookCategories()
	})
	it('should can get book category by id', async () => {
		const category = await createCategoryBook()
		console.log(category)
		const result = await supertest(web).get(`/api/books/categories/${category.id}`)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.category).toBe('Sosiologi');
	})
})

describe('Update Book Category', () => {
	afterEach(async () => {
		await removeBookCategories()
	})
	it('should can update book category by id', async () => {
		const category = await createCategoryBook()
		const result = await supertest(web)
			.put(`/api/books/categories/${category.id}`)
			.send({
				category: 'Biologi'
			});
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.category).toBe('Biologi');
	})
})

describe('Delete Book Category', () => {
	afterEach(async () => {
		await removeBookCategories()
	})
	it('should can delete books by id', async () => {
		const category = await createCategoryBook()
		const result = await supertest(web).delete(`/api/books/categories/${category.id}`)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('Book Category deleted successfully');
	})
})