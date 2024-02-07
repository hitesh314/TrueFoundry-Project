const getUserModel = require('../Model/getUserModel');
const getUserPromptsModel = require('../Model/getUserPromptsModel');

//Get user request history.
exports.getUserHistory = async (req, res) => {
  try{
    const {
      userId, timePeriod} = req.body;
    
    //Creating a hash value for the password.
    const existingUserDetails = await getUserModel.getUserDetailsById(userId);
    if(existingUserDetails.userDetails.length == 0)
    {
      return res.status(403).json({message : 'No user found for the given email.'})
    }
    //Getting the user prompt requests history.
    const getUserRequestsHistory = await getUserPromptsModel.getUserPromptsRequests(userId, timePeriod);
    res.status(201).json({result : getUserRequestsHistory.userDetails});
  }
  catch(error){
    res.status(403).json({message : "User Authentication error"});
  }
}