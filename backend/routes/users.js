const express = require('express');
const { getUsers, saveUser, login } = require('../controllers/user');

const router = express.Router();


// router.get('/users/:id'  );
router.get('/users', getUsers);

module.exports = router;
