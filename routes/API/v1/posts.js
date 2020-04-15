const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController_API = require('../../../controllers/API/V1/posts_api');

router.get('/',postsController_API.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsController_API.destroy);

module.exports = router;