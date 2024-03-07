const fp = require('fastify-plugin');
const mongoose = require('mongoose');

async function dbConnector(fastify, options) {
  
  mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));
  
  // Close the database connection when the server is shutting down
  fastify.addHook('onClose', (fastify, done) => {
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed');
      done();
    });
  });
  }


module.exports = fp(dbConnector);
