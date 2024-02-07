const bcrypt = require('bcryptjs');
const validator = require('validator');
const getUserModel = require('../Model/getUserModel');
const addUserModel = require('../Model/addUserModel');

//User register requests.
exports.register = async (req, res) => {
  try{
    const {
       fullName, email, password} = req.body;
       
    //Checking if the email is in correct format.
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address format.' });
    }
    //Getting the users data with input email address.
    const existingUserDetails = await getUserModel.getUserDetailsByEmail(email);    
    if(existingUserDetails.userDetails.length != 0)
    {
      return res.status(403).json({message : 'Email is already associated with some other user.'})
    }
    //Creating the hash value of password.
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUserInformation = {
      userFullName : fullName,
      userEmail : email,
      userPassword : hashPassword
    };
    //UserId will be the next item as the total users.
    const userId = existingUserDetails.totalUsers[0].user_count + 1;
    addUserModel.addUserRequest(newUserInformation , userId);
    
    //Scenerio : Success output;
    res.status(201).json({
      result: {
      userId: userId,
      name : newUserInformation.userFullName ,
      email : newUserInformation.userEmail,
    },
     message: "The user has been registered successfully." });
  }
  catch(error){
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
    //Getting the users data with input email address.
   const existingUserDetails = await getUserModel.getUserDetailsByEmail(email);
   if(existingUserDetails.userDetails.length == 0)
   {
     return res.status(403).json({message : 'No user found for the given email.'})
    }
    const userDetails = existingUserDetails.userDetails[0];
    const userId = existingUserDetails.totalUsers[0].user_count + 1;

    //Comparing the user input password with password in DB.
    if(bcrypt.compareSync(password, userDetails.password))
    {
      //Scenerio: Success Output.
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
    res.status(403).json({message : "User Authentication error"});
  }
};