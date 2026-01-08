// This variable constant represents applications list items
const applications = document.querySelectorAll("ol > li");

// This variable constant represents the "see more" button
const button = document.querySelector(".button-container button");

let visibleApplications = 11;

showApplications();

button.addEventListener("click", () => {
    visibleApplications += 10;
    showApplications();
})

function showApplications() {
    applications.forEach((application, index) => {
        application.style.display = index < visibleApplications ? "block" : "none";
    });
}