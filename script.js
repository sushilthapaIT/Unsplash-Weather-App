const id = "IwN3OlaV9GnBbUxm5FTFv7ZzT_-enYB7O4hS6AVgddo";
const url = `https://api.unsplash.com/search/photos?query=`;


const submitBtn = document.getElementById("button");
const imgo = document.getElementById("img");
const inputContent = document.getElementById("inputContent");
const bodyy = document.querySelector("body");
const imageToDisplay = document.getElementById("imageUnsplash");


let currentCategory = "landscape"; // Default category

// async function loadImages(category) {
//     try {
//         let response = await fetch(`${url}${category}&client_id=${id}`);
//         const data = await response.json();
//         if (data.results && data.results.length > 0) {
//             let randomNumber = Math.floor(Math.random() * data.results.length);
//             imageToDisplay.src = data.results[randomNumber].urls.regular;
//             console.log(data);
//         } else {
//             console.log("No results found for category: " + category);
//         }
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

async function loadImages(category) {
    try {
        let data = await $.ajax({
            url: `${url}${category}&client_id=${id}`,
            method: "GET",
            dataType: "json"
        });
        if (data.results && data.results.length > 0) {
            let randomNumber = Math.floor(Math.random() * data.results.length);
            imageToDisplay.src = data.results[randomNumber].urls.regular;
            console.log(data);
        } else {
            console.log("No results found for category: " + category);
        }
    } catch (error) {
        
        console.error("Error fetching data:", error);
    }
}


inputContent.addEventListener("input", (event) => {
    const inputValue = event.target.value.trim(); // Get input value and remove leading/trailing spaces
    if (inputValue !== "") {
        currentCategory = inputValue;
        loadImages(inputValue);
    }
});

// Refresh content based on user input every 10 seconds
setInterval(() => {
    loadImages(currentCategory);
}, 1000); // 10000 milliseconds = 10 seconds



// TIME

function updateLocalDateTime() {
    // Get the current date and time
    const now = new Date();
    
    // Format the date components
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    
    // Format the time components
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (12 AM)
    
    // Construct the date and time string
    const dateTimeString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Display the date and time in the HTML element with id "localDateTime"
    const localDateTimeElement = document.getElementById("localDateTime");
    if (localDateTimeElement) {
        localDateTimeElement.textContent = dateTimeString;
    }
}

// Update the local date and time every second
setInterval(updateLocalDateTime, 1000);

// Initial call to display local date and time immediately on page load
updateLocalDateTime();



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
