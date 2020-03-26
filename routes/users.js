const express = require('express');
const router = express.Router();

const userProfile = require('../controllers/userController');

router.get('/user/profile',userProfile.profile);

//userProfile.profile;

module.exports = router;

