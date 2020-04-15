const express = require('express');
const router = express.Router();


router.use('/posts_api',require('./posts'));
router.use('/users',require('./users'))

module.exports = router;