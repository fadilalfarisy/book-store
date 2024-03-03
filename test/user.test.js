import supertest from "supertest";
import { web } from "../src/application/web.js";
import {
	createTestUser,
	createVerifiedTestUser,
	createValidTokenTestUser,
	removeTestUser,
	removeTokenTest
} from "./test-util.js";
import { v4 as uuid } from "uuid";

describe('Create Admin', function () {

	afterEach(async () => {
		await removeTokenTest()
		await removeTestUser()
	})

	it('should can register new user', async () => {
		const result = await supertest(web)
			.post('/api/users/register')
			.send({
				email: 'lelekuning35@gmail.com',
				username: 'test',
				password: 'rahasia',
				role: 'ADMIN'
			});

		console.log(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.id).toBeDefined();
		expect(result.body.data.email).toBe("lelekuning35@gmail.com");
		expect(result.body.data.username).toBe("test");
		expect(result.body.data.role).toBe("ADMIN");
		expect(result.body.data.verified).toBe(false);
		expect(result.body.data.password).toBeUndefined();
	});

	it('should reject register request when invalid input', async () => {
		const result = await supertest(web)
			.post('/api/users/register')
			.send({
				email: 'lelekuning35@gmail.com',
				username: 'test',
				password: 'rahasia',
			});

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject register request when invalid data', async () => {
		const result = await supertest(web)
			.post('/api/users/register')
			.send({
				email: 'lelekuning35@gmail.com',
				username: 'test',
				password: 'rahasia',
				role: 'MASTER'
			});

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should can register when status verified user is false even email already registered', async () => {
		await createTestUser();
		const result = await supertest(web)
			.post('/api/users/register')
			.send({
				email: 'lelekuning35@gmail.com',
				username: 'test',
				password: 'rahasia',
				role: 'USER'
			});

		expect(result.status).toBe(200);
		expect(result.body.data.id).toBeDefined();
		expect(result.body.data.email).toBe("lelekuning35@gmail.com");
		expect(result.body.data.username).toBe("test");
		expect(result.body.data.role).toBe("USER");
		expect(result.body.data.verified).toBe(false);
		expect(result.body.data.password).toBeUndefined();
	});

	it('should reject register request when status verified user is true and email already registered', async () => {
		await createVerifiedTestUser()
		const result = await supertest(web)
			.post('/api/users/register')
			.send({
				email: 'lelekuning35@gmail.com',
				username: 'test',
				password: 'rahasia',
				role: 'ADMIN'
			});

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined()
	});
});

describe('Get All Admin', () => {

	it('should can get all users', async () => {
		const result = await supertest(web).get('/api/users')
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data).toEqual(expect.any(Array));
	})
})

describe('Delete Admin', () => {
	afterEach(async () => {
		await removeTestUser()
	})

	it('should can delete user', async () => {
		const user = await createTestUser()
		console.log(user)
		const result = await supertest(web).delete(`/api/users/${user.id}`)
		console.log(result.body)

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('User deleted successfully');
	})
})

describe('Verified Email Address', () => {

	afterEach(async () => {
		await removeTokenTest()
		await removeTestUser();
	})

	it('should change verified status user', async () => {
		const token = await createValidTokenTestUser()
		const result = await supertest(web).get(`/api/users/confirm/${token}`)

		console.log(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('Email verified successfully')
	})

	it('should reject token to change verified status user', async () => {
		const token = uuid()
		const result = await supertest(web).get(`/api/users/confirm/${token}`)

		console.log(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined()
	})
})

// it('should create verified user account', async () => {
// 	const result = await createVerifiedTestUser();
// 	console.log(result)
// })



