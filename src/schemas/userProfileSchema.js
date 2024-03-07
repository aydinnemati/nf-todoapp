const userProfileGetSchema = {
  description: 'Get user profile',
  tags: ['user'],
  headers: {
    type: 'object',
    properties: {
      Authorization: {
        type: 'string',
        description: 'Bearer token for authentication'
      }
    },
    required: ['Authorization']
  },
  response: {
    200: {
      description: 'Successful user profile retrieval',
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        // email: { type: 'string' },
        // Add other user properties as needed, excluding the password
      }
    },
    404: {
      description: 'User not found',
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
};

const userProfileUpdateSchema = {
  description: 'Update user profile',
  tags: ['user'],
  headers: {
    type: 'object',
    properties: {
      Authorization: {
        type: 'string',
        description: 'Bearer token for authentication'
      }
    },
    required: ['Authorization']
  },
  body: {
    type: 'object',
    properties: {
      username: { type: 'string', description: 'New username' },
      password: { type: 'string', description: 'New password' }
    },
    required: [] // No fields are required, as this is an update operation
  },
  response: {
    200: {
      description: 'Successful user profile update',
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        // email: { type: 'string' },
        // Add other user properties as needed
      }
    },
    404: {
      description: 'User not found',
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
};

module.exports = {
  userProfileGetSchema,
  userProfileUpdateSchema
};
