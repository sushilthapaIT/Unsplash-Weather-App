const id = "IwN3OlaV9GnBbUxm5FTFv7ZzT_-enYB7O4hS6AVgddo";
const url = `https://api.unsplash.com/search/photos?query=`;

const submitBtn = document.getElementById("button");
const imgo = document.getElementById("img");
const inputContent = document.getElementById("inputContent");
const bodyy = document.querySelector("body");

async function naam(inputValue) {
    try {
        let response = await fetch(url + inputValue + `&client_id=${id}`);
        const data = await response.json();
        if (data.results.length > 0) {
            bodyy.style.backgroundImage = `url(${data.results[0].urls.regular})`;
            console.log(data);
        } else {
            console.log("No results found.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    const inputValue = inputContent.value.trim(); // Get input value and remove leading/trailing spaces
    if (inputValue !== "") {
        naam(inputValue);
        inputContent.value = "";
    } else {
        console.log("Please enter a valid image name.");
    }
});

// Load default image on page load
window.addEventListener("load", () => {
    naam("landscape"); // Load default image on page load
});
