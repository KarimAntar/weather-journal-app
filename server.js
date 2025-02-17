// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
};

// GET
app.get('/all', getInfo);

// Callback function
function getInfo(req, res) {
  res.send(projectData);
}

// POST
app.post('/add', addData);

function addData(req, res) {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  }
  res.send(projectData);
}