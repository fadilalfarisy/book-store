import supertest from "supertest";
import { web } from "../src/application/web.js";
import {
  createTestUser,
  createVerifiedTestUser,
  removeTestUser,
} from "./test-util.js";

describe('Login', () => {

  afterEach(async () => {
    await removeTestUser();
  })

  it('should can login when email already registered and status verified true', async () => {
    await createVerifiedTestUser()
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        email: 'lelekuning35@gmail.com',
        password: 'rahasia',
      });

    console.log(result.body);

    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.email).toBe("lelekuning35@gmail.com");
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.role).toBe("USER");
    expect(result.body.data.verified).toBe(true);
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.access_token).toBeDefined();
    expect(result.body.data.refresh_token).toBeDefined();
  })

  it('should reject login when email already registered but status verified is false', async () => {
    await createTestUser()
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        email: 'lelekuning35@gmail.com',
        password: 'rahasia',
      });

    console.log(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  })

  it('should reject login when email wrong', async () => {
    await createTestUser()
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        email: 'lelekuning@gmail.com',
        password: 'rahasia',
      });

    console.log(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  })

  it('should reject login when password wrong', async () => {
    await createTestUser()
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        email: 'lelekuning35@gmail.com',
        password: 'salah',
      });

    console.log(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  })
})

describe('Refresh Token', () => {
  afterEach(async () => {
    await removeTestUser();
  })
  it('should create new refresh token', async () => {
    await createVerifiedTestUser()
    const user = await supertest(web)
      .post('/api/users/login')
      .send({
        email: 'lelekuning35@gmail.com',
        password: 'rahasia',
      });

    const result = await supertest(web)
      .get('/api/users/refresh')
      .set('Cookie', [`refresh_token=${user.body.data.refresh_token}`])
      .send()
    console.log(result.body)

    expect(result.status).toBe(200)
    expect(result.body.data.access_token).toBeDefined()
  })

  it('should reject create new refresh token', async () => {
    const result = await supertest(web)
      .get('/api/users/refresh')
      .set('Cookie', [`refresh_token=token`])
      .send()
    console.log(result.body)

    expect(result.status).toBe(401)
    expect(result.error).toBeDefined()
  })
})

// it('should create verified user account', async () => {
// 	const result = await createVerifiedTestUser();
// 	console.log(result)
// })



