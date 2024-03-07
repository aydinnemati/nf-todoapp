// src/routes/authRoutes.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async function (fastify, opts) {
  fastify.post('/signup', {
    schema: {
      description: 'Signup endpoint',
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
        }
      },
      response: {
        201: {
          description: 'Successful signup',
          type: 'object',
          properties: {
            token: { type: 'string' }
          }
        },
        500: {
          description: 'Internal server error',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { username, password } = request.body;
    try {
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);
      // console.log(hashedPassword, "asdasd")
      // Create new user
      // const user = new User({ username, password: hashedPassword });
      const user = new User({ username, password});
      await user.save();
      // Generate JWT token
      const token = fastify.jwt.sign({ id: user._id });
      reply.code(201).send({ token });
    } catch (error) {
      reply.status(500).send({ error: 'Unable to create user' });
      reply.status(500).send(error);
    }
  });
  fastify.post('/login', {
    schema: {
      description: 'Login endpoint',
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Successful login',
          type: 'object',
          properties: {
            token: { type: 'string' }
          }
        },
        401: {
          description: 'Unauthorized',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        500: {
          description: 'Internal server error',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { username, password } = request.body;
    console.log(request.body)
    try {
      const user = await User.findOne({ username });
      console.log(user)
      if (!user) {
        return reply.status(401).send({ error: 'Username not found' });
      }
      // Verify password
      const match = await bcrypt.compare(password, user.password);
      console.log(user.password)
      if (!match) {
        return reply.status(401).send({ error: 'Password is incorrect' });
      }
      // Generate JWT token
      const token = fastify.jwt.sign({ id: user._id });
      reply.send({ token });

    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Unable to log in' });
    }
  });
};
