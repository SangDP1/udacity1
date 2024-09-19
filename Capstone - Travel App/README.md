# Capstone - Travel App

## Overview

This project requires me to create a basic travel planning web app that uses multiple Web APIs. The project includes a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast (with a weather icon displayed, which is a bonus feature required for this project). If the trip is in the future, you will get a predicted forecast. 

The [Geonames API](http://www.geonames.org/export/web-services.html) is used to get the coordinates from the location entered, which is then feed to the [Weatherbit API](https://www.weatherbit.io/api) to get current or predicted weather data. The [Pixabay API](https://pixabay.com/api/docs/) are used to display an image of the location entered.
## Node version
 v20.17.0
## Getting started
1. Install the required packages (after changing to this directory): 
    ```
    $ npm install
    ```
2. Have your API credentials ready (sign up for one if needed) for Geonames, weatherbit, and pixabay
3. Create a .env file on the root of the project and enter your ID and key :
    ```
    geoNamesAPI_ID=**************************
    weatherbitAPI_KEY=**************************
    pixabayAPI_KEY=**************************
    ```
4. Run the build : 
    ```
    $ npm run build-prod
    ```
5. Run the server:
    ```
    $ npm start
    ```