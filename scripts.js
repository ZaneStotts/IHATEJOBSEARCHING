// This variable constant represents applications list items
const applications = document.querySelectorAll("ol > li");

// This variable constant represents the "see more" button
const button = document.querySelector(".button-container button");

// This is the number of applications visible when screen loads
// I chose number 11 because index starts at 0
let visibleApplications = 11;

// This calls a function in order to render the first set of visible applications
showApplications();

// This creates event listener so 10 more applications are made visible when "see more" button is clicked
button.addEventListener("click", () => {
    visibleApplications += 10;
    showApplications();
})

// This function loops through every <li> item and changes its display style from "none" to "block"
// "index" is a local variable representing the numeric position of the current <li> item
function showApplications() {
    applications.forEach((application, index) => {
        application.style.display = index < visibleApplications ? "block" : "none";
    });
}