const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

module.exports.saveUser = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().optional().min(2).max(30),
    avatar: Joi.string().optional().uri(),
    job: Joi.string().optional().min(2).max(30),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  const { password, ...data } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return User.create({ ...data, password: hashedPassword })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password').exec();
  if (!user) {
    return res.status(401).json('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json('Invalid email or password');
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return res.json({ token });
};
