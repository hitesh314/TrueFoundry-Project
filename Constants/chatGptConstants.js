const chatGptConstants = {
  requestAddress  :'https://api.openai.com/v1/chat/completions',
  promptModel3 : 'gpt-3.5-turbo',
  roleSystem : 'system',
  roleUser : 'user',
  roleSystemContent : 'You are a helpful assistant.',
  authorization : 'Authorization',
  contentType : 'Content-Type',
  applicationJson : 'application/json'
}

module.exports = chatGptConstants;
