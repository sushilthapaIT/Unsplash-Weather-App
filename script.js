// JavaScript
// Sushil Thapa
// C0919991
// 2024/02/27 

//defining API key and API URL
const apiKey = "4eaadd3e6d8b7fadae1d69e277294842";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//selecting DOM elements
const searchBox   = document.querySelector(".search input");
const searchBtn   = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherInfo = document.querySelector(".weather-info");
const loadingDiv  = document.querySelector('.loading'); 

//function to fetch weather data for a given city
async function checkWeather(city) {
    //displaying loading message
    loadingDiv.style.display = 'block'; // Show loading message
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();       
        //checking if the city is not found
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";        
            document.querySelector(".weather").style.display = "none";
        } else {
            //displaying weather data
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + "°C";
            document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
            document.querySelector(".country-code").innerHTML = data.sys.country;
            //setting weather icon and description based on weather conditions
            if(data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
                weatherInfo.innerHTML = "Cloudy";
            } else if(data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
                weatherInfo.innerHTML = "Clear";
            } else if(data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
                weatherInfo.innerHTML = "Rainy";
            } else if(data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
                weatherInfo.innerHTML = "Drizzle";
            } else if(data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
                weatherInfo.innerHTML = "Mist";
            }          
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }  finally {
        //hiding loading message regardless of success or failure
        loadingDiv.style.display = 'none'; // Hide loading message
    }
}

//event listener for search button click and checking validation
searchBtn.addEventListener("click", () => {
    if(searchBox.value === ""){
        alert("Input field cannot be empty");
    } else {
        //calling checkWeather function with the city input value
        checkWeather(searchBox.value);
        //clearing the input field after submission
        searchBox.value = "";
    }
});

//calling the function when the content is loaded
window.addEventListener('load', function() {
    loadingDiv.style.display = 'none';
});
