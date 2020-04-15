const express = require('express');
const router = express.Router();

const usersController_API = require('../../../controllers/API/V1/users_api');

router.post('/create-session',usersController_API.createSession);

module.exports = router;