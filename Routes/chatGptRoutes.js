const express = require('express');
const router = express.Router();
const chatGptPrompt = require('../controllers/chatGptPromptController');

//Register post request to the controller via router, 
//sending request to controllers.UserAuthenticationController.register.
router.post('/request',
    chatGptPrompt.request);
    
module.exports = router;