const fastify = require('../src/index'); // Adjust the path as necessary

beforeAll(async () => {
  await fastify.ready();
});

afterAll(async () => {
  await fastify.close();
});
