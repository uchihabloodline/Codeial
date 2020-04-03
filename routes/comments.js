const express = require('express');
const router = express.Router();
const passport = require('passport');

//console.log("Comments router loaded!");

const commentsController = require('../controllers/commentsController');

router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports = router;