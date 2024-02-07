const express = require('express');
const router = express.Router();
const chatGptPrompt = require('../controllers/chatGptPromptController');

//Get prompt request request to the controller via router, 
//sending request to controllers.chatGptPromptController.requests.
router.post('/request',
    chatGptPrompt.request);
    
module.exports = router;