const express = require('express');
const router = express.Router();
const passport = require('passport');

console.log("router loaded!");

const postController = require('../controllers/postsController');

router.post('/create',passport.checkAuthentication,postController.create);

module.exports = router;