/* Global Variables */
const form = document.querySelector('.app__form');

// API URL and KEY
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=a559376142b656757b98ba82bad5bd9e&units=metric';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Even listener to 'generate' button click
document.getElementById('generate').addEventListener('click', generateClick);

function generateClick(e) {
    e.preventDefault();
    // get user input values
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(apiURL, newZip, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    })
  // reset form
  form.reset();
}


/* Function to GET Web API Data*/
const getWeather = async (apiURL, newZip, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(apiURL + newZip + apiKey);
    try {
      // userData equals to the result of fetch function
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.log("error", error);
    }
  }
  
  /* Function to POST data */
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })
  
    try {
      const newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };

  const updateUI = async () => {
    const request = await fetch('/all');
    try {
      const allData = await request.json()
      // Update entry values
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
      console.log("error", error);
    }
  };