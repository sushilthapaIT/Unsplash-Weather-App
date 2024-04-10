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
