/* Global Variables */
const form = document.querySelector('.app__form');

// API URL and KEY
const base = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'a559376142b656757b98ba82bad5bd9e';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Even listener to 'generate' button click
document.getElementById('generate').addEventListener('click', generateClick);

function generateClick(e) {
    e.preventDefault();
    // get user input values
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(base, zipCode, apiKey)
    .then(function (data) {
      // add data to POST request
      postData('/add', { date: newDate, temp: data.main.temp, content })
    }).then(function (data) {
      // call update function to update browser content
      update()
    })
  // reset form
  form.reset();
}


const getWeather = async (base, zip, apiKey) => {
    const res = await fetch(`${base}?zip=${zip}&appid=${apiKey}&units=metric`);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
  
  // Post Data
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      // To match data with "Content-Type" header
      body: JSON.stringify(data)
    })
  
    try {
      const newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };

  const update = async () => {
    const request = await fetch('/all');
    try {
      const upData = await request.json()
      // Update values
      document.getElementById('date').innerHTML = `Date: ${upData.date}`;
      document.getElementById('temp').innerHTML = `Temperature: ${Math.round(upData.temp)} °C`;
      document.getElementById('content').innerHTML = `Feeling: ${upData.content}`;
    }
    catch (error) {
      console.log("error", error);
    }
  };