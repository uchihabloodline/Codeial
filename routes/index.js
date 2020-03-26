const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
//const userController = require('./users');

router.get('/',homeController.home);
router.get('/user/profile',require('./users'));

module.exports = router;