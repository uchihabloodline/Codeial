const express = require('express');
const router = express.Router();

console.log("router loaded!");

const homeController = require('../controllers/homeController');
//const userController = require('./users');

router.get('/',homeController.home);
// router.get('/user/profile',require('./users'));
// router.get('/sign-up',require('./users'));
// router.get('/sign-in',require('./users'));
router.use('/user',require('./user'));

module.exports = router;