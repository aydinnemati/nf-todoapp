const createTodoSchema = {
    description: 'Create a new todo',
    tags: ['todo'],
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
      required: ['description'],
      properties: {
        description: { type: 'string' },
      }
    },
    response: {
      201: {
        description: 'Successful todo creation',
        type: 'object',
        properties: {
          id: { type: 'string' },
          description: { type: 'string' },
          user: { type: 'string' },
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
  };
  
const getTodosSchema = {
  description: 'Get all todos for the logged-in user',
  tags: ['todo'],
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
      description: 'Successful todos list',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          description: { type: 'string' },
          user: { type: 'string' },
        }
      }
    }, 401: {
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
};

const editTodoSchema = {
  description: 'Edit a todo',
  tags: ['todo'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Todo ID', pattern: '^[0-9a-fA-F]{24}$' } // this pattern is for mongodb objectID
    },
    required: ['id']
  },
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
      description: { type: 'string', description: 'Description of the todo' },
      completed: { type: 'boolean', description: 'Completion status of the todo' },
      status: {
        type: 'string',
        description: 'Status of the todo',
        enum: ['not_started', 'test', 'done'],
      }
    },
    required: ['description', 'completed']
  },
  response: {
    200: {
      description: 'Successful todo update',
      type: 'object',
      properties: {
        id: { type: 'string' },
        description: { type: 'string' },
        completed: { type: 'boolean' },
        user: { type: 'string' },
      }
    },
    404: {
      description: 'Todo not found',
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

const deleteTodoSchema = {
  description: 'Delete a todo',
  tags: ['todo'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Todo ID', pattern: '^[0-9a-fA-F]{24}$' }
    },
    required: ['id']
  },
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
    404: {
      description: 'Todo not found',
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
  createTodoSchema,
  getTodosSchema,
  editTodoSchema,
  deleteTodoSchema
};
