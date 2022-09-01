const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Front end is waiting for post request
// Rest of route is declared by express app

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);


module.exports = router; 