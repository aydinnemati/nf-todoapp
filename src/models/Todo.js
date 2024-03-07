const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['not_started', 'test', 'done'],
    default: 'not_started'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);