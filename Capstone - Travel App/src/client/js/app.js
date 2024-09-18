//// process date input
let today = new Date();

let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();
if(dd<10){
      dd='0'+dd
  } 
  if(mm<10){
      mm='0'+mm
  } 
today = yyyy+'-'+mm+'-'+dd;
// console.log(today)
document.getElementById("departureDate").setAttribute("min", today);



function validateInput(){
  let isValid = true;

  // get user input of cityName
  const userCityName = document.querySelector('#city').value;
  if(userCityName === ""){
    // console.log(document.querySelector('#city'))
    document.querySelector('#city').classList.add("buttonWarning")
    isValid = false;
  } else {
    document.querySelector('#city').classList.remove("buttonWarning")
  }

  //get user inputed date (after the button click event)
  const userDate = document.getElementById('departureDate').value;
  if(userDate === ""){
    // console.log(document.querySelector('#departureDate'))
    document.querySelector('#departureDate').classList.add("buttonWarning")
    isValid = false;
  } else {
    document.querySelector('#departureDate').classList.remove("buttonWarning")
  }

  return isValid;

}


/* Function to POST combined data to server */
const postData = async ( url = '', data = {})=>{
    //console.log(data)
      const res = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
      try {
        //console.log(res);
        const newData = await res.json();
        //console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error); 
      }
  }




function getCityPicture(){
  // get user input of cityName
  const userCityName = document.querySelector('#city').value;

  console.log("hi"+userCityName)
  //send userCityName to pixabay API to get a profile pic of the city (process in the server)
  return postData("http://localhost:3000/pixabay", {cityName: userCityName})
}

function getGeoInfo(data){
  console.log(data)
  //send city name to geoNames API to get lat/lon info (process in the server)
  return postData("http://localhost:3000/GeoNames", {cityName: data.cityName, picURL: data.picURL})

}

function getWeather(res){
  console.log(res)
  if (res.data === "user city name returns nothing"){
    //show warning message on screen
    document.getElementById('results').innerHTML = "The place can't be recognized, Please try a different one!" 
    //stop here and return the following custom-made error message in the console
    throw "user city name returns nothing";
  }


  //get user inputed date (after the button click event)
  let userDate = document.getElementById('departureDate').value;
  
  //compare user inputed date and today
  let diffTime = Math.abs(new Date(userDate) - new Date(today));
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  console.log("difference in userDate and today: " + diffDays + " days")

  //get user inputed date in the MM-DD format (for weatherbit API use)
  let userDateMMDD = userDate.slice(userDate.length - 5)

  //if the departure date is less than 7 days away
  if(diffDays <= 7){
    //send it to weatherbitAPI to get CURRENT weather data
    return postData("http://localhost:3000/WeatherbitCurrent", {lng: res.data.lng, lat: res.data.lat, des: {cityName: res.data.name, countryName: res.data.countryName, daysAway: diffDays, cityURL: res.cityURL}})
    // .then(function(res){
    //   console.log(res)
    // })
  } else {//if the departure date more than 7 days in the future
    //send it to weatherbitAPI to get FUTURE weather data
    return postData("http://localhost:3000/WeatherbitNormal", {lng: res.data.lng, lat: res.data.lat, userDate: userDateMMDD, des: {cityName: res.data.name, countryName: res.data.countryName, daysAway: diffDays, cityURL: res.cityURL}})
  }
  
}

function displayResult(data){
  console.log(data)

  //get today
  let daysAwayText = ""
  // console.log(data.des.daysAway)
  if (data.des.daysAway === 0) {
     daysAwayText = "today"
  } else if (data.des.daysAway === 1) {
     daysAwayText = "tomorrow"
  } else {
     daysAwayText = data.des.daysAway + " days away"
  }
  // console.log(daysAwayText)
  
  let countdownHTML = `<div id = "countdown"><span id = "cityName">${data.des.cityName}, ${data.des.countryName}</span> is <span id = "daysAway">${daysAwayText}</span>!</div>`

  let weatherHTML = ""
  if (data.des.daysAway <= 7){
    weatherHTML = 
    `<div id = "temperature">
      <span id = tempTitle>Current weather at the destination is: </span>
      <ul class="list">
        <li><span id = "temp">Temperature: ${data.data.temp} °C</span></li>
        <li><span id = "tempFeel">Feels like: ${data.data.app_temp} °C</span></li>
        <li><span id = "tempDes">${data.data.weather.description}<img id = "tempIcon", src = "https://www.weatherbit.io/static/img/icons/${data.data.weather.icon}.png"></span></li>
      </ul>
    </div>`

  } else {
    weatherHTML = 
    `<div id = "temperature">
      <span id = tempTitle>Typical weather for then is: </span>
      <ul class="list">
        <li><span id = "tempHigh">High: ${data.data.max_temp} °C</span></li>
        <li><span id = "tempLow">Low: ${data.data.min_temp} °C</span></li>
        <li><span id = "temAvg">Average: ${data.data.temp}°C</span></li>
      </ul>
    </div>`
  }
  // console.log(weatherHTML)
  const resultHTML = countdownHTML + weatherHTML;
  // console.log(resultHTML)

  document.getElementById('results').innerHTML = resultHTML 



  let pictureHTML = `<img src= ${data.des.cityURL} alt = "destination city picture">`
  //insert city pic
  document.getElementById('cityPic').innerHTML = pictureHTML 

}


function displayResults(){

  if(validateInput()){
    getCityPicture()
    .then(getGeoInfo)
    .then(getWeather)
    .then(displayResult)
  }
}

function removeResults(){
  document.getElementById('results').innerHTML = "";

  let pictureHTML = `<img src= "https://cdn.pixabay.com/photo/2017/01/16/15/51/hiker-1984421_960_720.jpg" alt = "destination city picture">`
  document.getElementById('cityPic').innerHTML = pictureHTML 

}


export{ displayResults, removeResults }


