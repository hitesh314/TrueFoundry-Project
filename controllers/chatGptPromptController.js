const chatgptConstants = require('../Constants/chatGptConstants');
const axios = require('axios');
const insertRequestModel = require('../Model/addUserRequestsModel');
require("dotenv").config(); 

//Function to handle the input requests for getting chat gpt responses.
exports.request = async (req, res) => {
  try { 
    const startTime = new Date();
    const {promptMessage, userId} = req.body;
    //Getting the respones from chatGpt.
    const chatGptResponse = await getChatGptResponse(promptMessage);
    //Storing the chatGpt output we received.
    insertRequestModel.insertUserRequest(chatGptResponse, userId, promptMessage, startTime.getTime());
    //Scenerio : Success output.
    res.status(chatGptResponse.statusCode).json({ result : chatGptResponse.response });
	}
  catch (err) { 
    res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
	}
}; 

//Function to get the chatgpt respose for given prompt message.
const getChatGptResponse = async (promptMessage) => {
  try
  {
    const chatGPTResponse = await axios.post(chatgptConstants.requestAddress, {
      messages: [{ role: chatgptConstants.roleSystem, content: chatgptConstants.roleSystemContent }, 
                { role: chatgptConstants.roleUser, content: promptMessage }],
      model : chatgptConstants.promptModel3,
    }, {
      headers: {
        'Authorization': process.env.CHATGPT_KEY,
        'Content-Type': chatgptConstants.applicationJson,
      },
    });

    var result = {
      response : chatGPTResponse.data.choices[0].message.content,
      promptTokens : chatGPTResponse.data.usage.prompt_tokens,
      outputTokens : chatGPTResponse.data.usage.completion_tokens,
      statusCode : chatGPTResponse.status,
    }

    return result;
  }
  catch(error)
  {
    var result = {
      response : error.response.statusText,
      promptTokens : 0,
      outputTokens : 0,
      statusCode : error.response.status,
    };

    return result;
  }
};