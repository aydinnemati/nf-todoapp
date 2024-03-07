const supertest = require('supertest');
const buildFastify = require('../src/index'); // Adjust the import path as necessary

const fastify = buildFastify();

beforeAll(async () => {
  await fastify.ready();
});

afterAll(async () => {
  await fastify.close();
});

describe('Authentication Endpoints', () => {
  const testUser = {
    username: 'testuser',
    // email: 'test@example.com',
    password: 'password123',
  };

  it('should create a new user on /signup', async () => {
    const response = await supertest(fastify.server)
      .post('/signup')
      .send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
  });

  it('should log in a user on /login', async () => {
    const response = await supertest(fastify.server)
      .post('/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
