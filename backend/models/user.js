const validator = require('validator');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const validateEmail = (email) => validator.isEmail(email);

const userSchema = new Schema({
  name: { type: String, minlength: 2, maxlength: 30, default: "Jacques Cousteau" },
  about: { type: String, minlength: 2, maxlength: 30 },
  avatar: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Email is invalid'],
  },
  password: { type: String, required: true, select: false },
});

module.exports = model('User', userSchema);
