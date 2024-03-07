// src/routes/userRoutes.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {
  userProfileGetSchema,
  userProfileUpdateSchema

} = require('../schemas/userProfileSchema.js');

module.exports = async function (fastify, opts) {
  // Get user profile
  fastify.get('/profile', { preValidation: [fastify.authenticate], schema: userProfileGetSchema }, async (request, reply) => {
    try {
      const user = await User.findById(request.user.id).select('-password');
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }
      reply.send(user);
    } catch (error) {
      reply.status(500).send({ error: 'Unable to fetch user profile' });
    }
  });

// Update user profile
fastify.put('/profile', {
  preValidation: [fastify.authenticate],
  schema: userProfileUpdateSchema
}, async (request, reply) => {
  const { username, password } = request.body;
  const updates = {};
  if (username) updates.username = username;
  if (password) {
    // Hash the new password before saving
    updates.password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(request.user.id, updates, { new: true }).select('-password');
    if (!updatedUser) {
      return reply.status(404).send({ error: 'User not found' });
    }
    reply.send(updatedUser);
  } catch (error) {
    reply.status(500).send({ error: 'Unable to update user profile' });
  }
  })
};
