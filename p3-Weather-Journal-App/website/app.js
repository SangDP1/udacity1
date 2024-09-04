// Personal API Key for OpenWeatherMap API
const API_KEY = ",us&APPID=e23122c5062eb361eb2aa6ee3762e1db&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// Convert date
function convertDate(unixtimestamp) {

  var date = new Date(unixtimestamp * 1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;

}

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
document.getElementById("generate").addEventListener("click", displayAction);

function displayAction() {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getDataApi(baseURL, zip, API_KEY)
    .then(function (data) {
      // Add data
      console.log("AllData from api: ", data);
      postDataApi("/addWeatherData", {
        temperature: data.main.temp,
        date: convertDate(data.dt),
        name: data.name,
        userResponse: feelings,
      });
    })
    .then(() => updateUI());
}

// Async GET
/* Function to GET Web API Data*/
const getDataApi = async (baseURL, zip, API_KEY) => {
  const url = `${baseURL}${zip}${API_KEY}`;

  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    if (allData.message) {
      alert(allData.message);
    } else {
      return allData;
    }
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// Async POST
/* Function to POST data */
// Async POST
const postDataApi = async (url = "", data = {}) => {
  console.log("post weather data: ", data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    console.log("post res: ", newData);
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to update UI */
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const data = await request.json();
    console.log("updateUI: ", data);
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${data.temperature} °C`;
    document.getElementById(
      "content"
    ).innerHTML = `Feelings: ${data.userResponse}`;
    document.getElementById("name").innerHTML = `City name: ${data.name}`;
  } catch (error) {
    console.log("error", error);
  }
};
