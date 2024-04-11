// Sushil Thapa
// C0919991
// 2024/04/10
// JS File

// API Key for Unsplash
const id = "IwN3OlaV9GnBbUxm5FTFv7ZzT_-enYB7O4hS6AVgddo";
const url = `https://api.unsplash.com/search/photos?query=`;

// Elements from the DOM
const submitBtn = $("#button");
const inputContent = $("#inputContent");
const imageToDisplay = $("#imageUnsplash");

// Default category
let currentCategory = "landscape";

// Function to load images
async function loadImages(category) {
    try {
        // AJAX call to fetch images from Unsplash API
        let data = await $.ajax({
            url: `${url}${category}&client_id=${id}`,
            method: "GET",
            dataType: "json"
        });
        // Checking if results are available
        if (data.results && data.results.length > 0) {
            // Generating random index to display a random image
            let randomNumber = Math.floor(Math.random() * data.results.length);
            // Setting the source of the image element to the URL of the random image
            imageToDisplay.attr("src", data.results[randomNumber].urls.regular);
            console.log(data);
        } else {
            console.log("No results found for category: " + category);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Event listener for input
$("#inputContent").on("input", function(event) {
    // Getting the trimmed value of the input
    const inputValue = $(this).val().trim();
    // Checking if input is not empty
    if (inputValue !== "") {
        // Updating current category and load images based on the new category
        currentCategory = inputValue;
        loadImages(inputValue);
    }
});

// OpenWeatherMap API Key and URL
const apiKey = "4eaadd3e6d8b7fadae1d69e277294842";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Elements from the DOM for weather display
const searchBox = $(".search input");
const searchBtn = $(".search button");
const weatherIcon = $(".weather-icon");
const weatherInfo = $(".weather-info");
const loadingDiv = $('.loading');

// Function to fetch and display weather data
async function checkWeather(city) {
    loadingDiv.css('display', 'block');
    try {
        // Fetching weather data from OpenWeatherMap API
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        // Checking if city is not found
        if (response.status == 404) {
            $(".error").css("display", "block");
            $(".weather").css("display", "none");
        } else {
            // Updating weather information in the DOM
            $(".city").html(data.name);
            $(".temperature").html(Math.round(data.main.temp) + "°C");
            $(".humidity").html(data.main.humidity + "%");
            $(".wind").html(data.wind.speed + " km/h");
            $(".feels-like").html(Math.round(data.main.feels_like) + "°C");
            $(".pressure").html(data.main.pressure + " hPa");
            $(".country-code").html(data.sys.country);
            // Setting weather icon and description based on weather conditions
            let weatherIconSrc;
            let weatherInfoText;
            switch(data.weather[0].main) {
                case "Clouds":
                    weatherIconSrc = "images/clouds.png";
                    weatherInfoText = "Cloudy";
                    break;
                case "Clear":
                    weatherIconSrc = "images/clear.png";
                    weatherInfoText = "Clear";
                    break;
                case "Rain":
                    weatherIconSrc = "images/rain.png";
                    weatherInfoText = "Rainy";
                    break;
                case "Drizzle":
                    weatherIconSrc = "images/drizzle.png";
                    weatherInfoText = "Drizzle";
                    break;
                case "Mist":
                    weatherIconSrc = "images/mist.png";
                    weatherInfoText = "Mist";
                    break;
                default:
                    weatherIconSrc = "";
                    weatherInfoText = "Unknown";
            }
            // Updating weather icon and info
            weatherIcon.attr("src", weatherIconSrc);
            weatherInfo.html(weatherInfoText);
            $(".weather").css("display", "block");
            $(".error").css("display", "none");
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    } finally {
        // Hiding loading indicator
        loadingDiv.css('display', 'none');
    }
}

// Event listener for search button
$(".search button").on("click", function() {
    // Checking if search box is empty
    if(searchBox.val() === "") {
        alert("Input field cannot be empty");
    } else {
        // Fetching weather data for the specified city and clear search box
        checkWeather(searchBox.val());
        searchBox.val("");
    }
});

// Event listener for window load
$(window).on('load', function() {
    loadingDiv.css('display', 'none');
});


// Function to update local date and time
function updateLocalDateTime() {
    // Getting the current date and time
    const now = new Date();
    
    // Extracting year, month, day, hours, minutes, seconds, and AM/PM indicator
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    // Constructing the date-time string in the desired format
    const dateTimeString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Getting the element with the id "localDateTime" using jQuery
    const localDateTimeElement = $("#localDateTime");
    
    // If the element exists, set its text content to the date-time string
    if (localDateTimeElement.length) {
        localDateTimeElement.text(dateTimeString);
    }
}

// Function to initialize the application
function init() {
    // Setting interval to update local date and time every second
    setInterval(updateLocalDateTime, 1000);
    // Setting interval to update weather every minute (60000 milliseconds)
    setInterval(() => {
        checkWeather(city);
    }, 60000);
    // Setting interval to update pictures every 20 seconds (20000 milliseconds)
    setInterval(() => {
        loadImages(currentCategory);
    }, 20000); 
}

// Calling init function when the page is loaded
$(document).ready(init);