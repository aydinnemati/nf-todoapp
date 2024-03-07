// src/utils/auth.js
const fp = require('fastify-plugin');

async function auth(fastify, options) {
  fastify.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET
  });

  fastify.decorate("authenticate", async function(request, reply) {
    try {
    const user = await request.jwtVerify();
    request.user = user; // Attach the user data to the request object
    } catch (err) {
      reply.send(err);
    }
  });
}

module.exports = fp(auth);
