const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

router.get('/profile',userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:    '/user/sign-in'},
), userController.createSession);

router.get('/sign-out', userController.destroySession);

//userProfile.profile;

module.exports = router;

