require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');

const { handleJsonParsingError } = require('./utils/utils');

// express app
const app = express();//creates an instance of the Express application.
const server = http.createServer(app);//creates an HTTP server using the Express application app.

// middleware
app.use(express.json());
//This middleware parses incoming JSON payloads in HTTP requests, making them accessible in the req.body property of route handlers. This is essential for handling JSON data in request bodies.
app.use(cors());

app.use(handleJsonParsingError);//middleware will handle errors related to JSON parsing when handling requests.

// ROUTES
routes(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
