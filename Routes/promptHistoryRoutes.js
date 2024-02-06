const express = require('express');
const router = express.Router();
const userPrompts = require('../controllers/userRequestsHistoryController');

//Get user prompt history
//sending request to controllers.userRequrestsHistoryController.getUserHistory.
router.post('/history',
    userPrompts.getUserHistory);
    
module.exports = router;