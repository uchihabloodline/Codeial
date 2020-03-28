const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/profile',userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);

//userProfile.profile;

module.exports = router;

