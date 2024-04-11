const express = require('express');
const { getUsers, saveUser } = require('../controllers/user');

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', saveUser);

// router.get('/users/:id'  );

module.exports = router;
