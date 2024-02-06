//for password generate using enrypt.
const bcrypt = require('bcryptjs');
const validator = require('validator');
const getUserModel = require('../Model/getUserModel');
const addUserModel = require('../Model/addUserModel');

//User register requests.
exports.register = async (req, res) => {
  try{
    const {
       fullName, email, password} = req.body;
       
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address format.' });
    }
    //Creating a hash value for the password.
    const existingUserDetails = await getUserModel.getUserDetailsByEmail(email);
    console.log(existingUserDetails);
    if(existingUserDetails.userDetails.length != 0)
    {
      return res.status(403).json({message : 'Email is already associated with some other user.'})
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUserInformation = {
      userFullName : fullName,
      userEmail : email,
      userPassword : hashPassword
    };
    const userId = existingUserDetails.totalUsers[0].user_count + 1;
    addUserModel.addUserRequest(newUserInformation , userId);
    
    res.status(201).json({
      result: {
      userId: userId,
      name : newUserInformation.userFullName ,
      email : newUserInformation.userEmail,
    },
     message: "The user has been registered successfully." });
  }
  catch(error){
    console.log(error);
    res.status(403).json({message : "User Authentication error"});
  }
};

//User login requests.
exports.login = async (req, res) => {
  try{
    const {
      email, password} = req.body;
      
    //checking if the given email address is valid;
   if (!validator.isEmail(email)) {
     return res.status(400).json({ message: 'Invalid email address format.' });
   }
   //Creating a hash value for the password.
   const existingUserDetails = await getUserModel.getUserDetailsByEmail(email);
   console.log(existingUserDetails);
   if(existingUserDetails.userDetails.length == 0)
   {
     return res.status(403).json({message : 'No user found for the given email.'})
    }
    const userDetails = existingUserDetails.userDetails[0];
    const userId = existingUserDetails.totalUsers[0].user_count + 1;

    if(bcrypt.compareSync(password, userDetails.password))
    {
      res.status(201).json({
        result: {
        userId: userId,
        name : userDetails.name,
        email : userDetails.email,
      },
        message: "Login successfull." });
      return;
    }
    else
    {
      res.status(403).json({
        message: "Invalid Credentials." });
    }
  }
  catch(error){
    console.log(error);
    res.status(403).json({message : "User Authentication error"});
  }
};

//Get user request history.
exports.getUserHistory = async (req, res) => {
  try{
    const {
      userId, timePeriod} = req.body;
    
    //Creating a hash value for the password.
    const existingUserDetails = await getUserModel.getUserDetailsById(userId);
    console.log(existingUserDetails);
    if(existingUserDetails.userDetails.length == 0)
    {
      return res.status(403).json({message : 'No user found for the given email.'})
    }

    if(bcrypt.compareSync(password, userDetails.password))
    {
      // const userRequestsHistory = get
    }
    else
    {
      res.status(403).json({
        message: "Invalid Credentials." });
    }
  }
  catch(error){
    console.log(error);
    res.status(403).json({message : "User Authentication error"});
  }
}