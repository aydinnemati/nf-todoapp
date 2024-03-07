// src/routes/todoRoutes.js
const {
  createTodoSchema,
  getTodosSchema,
  editTodoSchema,
  deleteTodoSchema
} = require('../schemas/todoSchemas');

const Todo = require('../models/Todo');

module.exports = async function (fastify, opts) {
  
  // Create a new todo
  fastify.post('/todos', {
    preValidation: [fastify.authenticate],
    schema: createTodoSchema
  },
    async (request, reply) => {
    const { description } = request.body;
    const userId = request.user.id; // Assuming the user's ID is stored in the token
    try {
      // const decoded = await request.jwtVerify();
      // console.log(decoded);
      const todo = new Todo({
        description,
        user: userId,
      });
      await todo.save();
      reply.code(201).send(todo);
    } catch (error) {
      reply.status(500).send({ error: 'Unable to create todo' });
    }
  });
  

  // Get all todos for the logged-in user
  fastify.get('/todos', {
    preValidation: [fastify.authenticate],
    schema: getTodosSchema
 }, async (request, reply) => {
    try {
      console.log(request.user.id)
      const todos = await Todo.find({ user: request.user.id });
      console.log(todos);
      reply.send(todos);
    } catch (error) {
      reply.status(500).send({ error: 'Unable to fetch todos' });
    }
  });

  // Update a todo
  fastify.put('/todos/:id', {
    preValidation: [fastify.authenticate],
    schema: editTodoSchema
  }, async (request, reply) => {
    const { id } = request.params;
    const { description, completed, status } = request.body;
    try {
      const updatedTodo = await Todo.findOneAndUpdate({ _id: id, user: request.user.id }, {
        description,
        completed,
        status
      }, { new: true });
      if (!updatedTodo) {
        return reply.status(404).send({ error: 'Todo not found' });
      }
      reply.send(updatedTodo);
    } catch (error) {
      reply.status(500).send({ error: 'Unable to update todo' });
    }
  });

  // Delete a todo
  fastify.delete('/todos/:id', {
    preValidation: [fastify.authenticate],
    schema: deleteTodoSchema
  }, async (request, reply) => {
    const { id } = request.params;
    try {
      const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: request.user.id });
      if (!deletedTodo) {
        return reply.status(404).send({ error: 'Todo not found' });
      }
      reply.status(204).send();
    } catch (error) {
      reply.status(500).send({ error: 'Unable to delete todo' });
    }
  });
};
