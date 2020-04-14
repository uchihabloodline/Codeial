const express = require('express');
const router = express.Router();

const postsController_API = require('../../../controllers/API/V1/posts_api');

router.use('/',postsController_API.index);

module.exports = router;