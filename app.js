const express = require('express');
const bodyParser = require('body-parser');
const chatGptRoutes = require('./Routes/chatGptRoutes');
const userAuthenticateRoutes = require('./Routes/userAuthenticateRoutes');
const userRequestsRoutes = require('./Routes/promptHistoryRoutes');

//creating our express app.
const app = express();

//defining the port.
const PORT = 3001;

app.listen(PORT, console.log("Server has strated at PORT :" + PORT));

//Defining body parsing for transervering json form data,
app.use(bodyParser.json());

//Handling the user prompt request.
app.use('/api/chatgpt', chatGptRoutes);

//Handling the user authentication request.
app.use('/api/authenticate', userAuthenticateRoutes);

//Handling the user prompts statistics request.
app.use('/api/requests', userRequestsRoutes);

module.exports = app;