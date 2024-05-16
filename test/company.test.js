import supertest from "supertest";
import { web } from "../src/application/web.js";
import { createCompany, removeCompany } from "./test-util.js";

describe('Create Company', () => {

	afterEach(async () => {
		await removeCompany()
	})

	it('it should can create company profile', async () => {
		const result = await supertest(web)
			.post('/api/company')
			.send({
				name: 'bibi',
				industry: 'books publisher',
				description: 'since 2002',
				vision: 'globally',
				mission: `a\nb\nc`,
			});

		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data.name).toBe('bibi');
		expect(result.body.data.industry).toBe('books publisher');
		expect(result.body.data.description).toBe('since 2002');
		expect(result.body.data.vision).toBe('globally');
		expect(result.body.data.mission).toBe(`a\nb\nc`);
	})
})

describe('Update Company', () => {

	afterEach(async () => {
		await removeCompany()
	})

	it('it should can update company profile', async () => {
		await createCompany()
		const result = await supertest(web)
			.post('/api/company')
			.send({
				name: 'updated bibi',
				industry: 'books publisher',
				description: 'since 2001',
				vision: 'globally',
				mission: `a\nb\nc`,
			});

		console.log(result.body.data)

		expect(result.status).toBe(200);
		expect(result.body.data.name).toBe('updated bibi');
		expect(result.body.data.industry).toBe('books publisher');
		expect(result.body.data.description).toBe('since 2001');
		expect(result.body.data.vision).toBe('globally');
		expect(result.body.data.mission).toBe('a\nb\nc');
	})

	it('it should reject when format input to create company profile is false', async () => {
		const result = await supertest(web)
			.post('/api/company')
			.send({
				name: 'bibi',
				industry: 'books publisher',
				description: 'since 2002',
				visi: 'globally',
				misi: 1312,
			});

		console.log(result.body.data)

		expect(result.status).toBe(400);
		expect(result.error).toBeDefined()
	})
})

describe('Get Company Info', () => {
	afterEach(async () => {
		await removeCompany()
	})

	it('it should can get company profile info', async () => {
		await createCompany()
		const result = await supertest(web).get('/api/company')

		expect(result.status).toBe(200);
		expect(result.body.data[0].name).toBe('bibi');
		expect(result.body.data[0].industry).toBe('books publisher');
		expect(result.body.data[0].description).toBe('since 2002');
		expect(result.body.data[0].vision).toBe('globally');
		expect(result.body.data[0].mission).toBe('a\nb\nc');
	})

	it('it should can get empty company profile', async () => {
		const result = await supertest(web).get('/api/company')

		expect(result.status).toBe(200);
		expect(result.body.data).toEqual(expect.any(Array));
	})
})