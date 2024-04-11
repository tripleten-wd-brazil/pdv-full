const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

module.exports.saveUser = (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
