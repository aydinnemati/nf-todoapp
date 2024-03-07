const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }]
}, { timestamps: true });

// Pre-save hook to hash password before saving to database
// bcrypt -> $algorithm$cost$salt$hash
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    this.password = await bcrypt.hash(this.password, salt);
    // this.password = await bcrypt.hash(this.password, '$2b$10$m5au.T1pBswpUf.8Iivt.O');
    return next();
  } catch (error) {
    return next(error);
  }
});

// Method to check password validity
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
