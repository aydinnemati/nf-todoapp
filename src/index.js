const fastify = require('fastify')({ logger: true });
require('dotenv').config();
const path = require('path');


// Register Swagger
fastify.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Test API',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true
});

// Database connection
fastify.register(require('./plugins/db'));
fastify.register(require('./utils/auth')); // check this 

// Register routes
fastify.register(require('./routes/authRoutes'));
fastify.register(require('./routes/todoRoutes'));
fastify.register(require('./routes/userRoutes'));



// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.swagger();
    console.log(`Server running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
