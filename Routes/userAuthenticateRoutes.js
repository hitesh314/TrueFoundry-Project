const express = require('express');
const router = express.Router();
const userAuthentication = require('../controllers/UserAuthenticationController');

//sending register request to controllers.UserAuthenticationController.register.
router.post('/register',
    userAuthentication.register);

//sending login request to controllers.UserAuthenticationController.login.
router.post('/login',
    userAuthentication.login);
    
module.exports = router;