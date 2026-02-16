// This variable constant represents the header element
const header = document.querySelector("header");

// This variable constant represents the menu button
const menuButton = document.querySelector(".open-menu");

// Event listener tells the arrow function runs when the menu button is clicked
menuButton.addEventListener("click", () => {
    header.classList.toggle("menu-open");
});

// This variable constant represents every <a> tag in the menu
const navLinks = document.querySelectorAll(".links-container a");

// Loops through links in the menu and attaches an click event listener to each one
navLinks.forEach(link => {

    // This line removes the "menu-open" class after a link is clicked so the menu can collapse
    link.addEventListener("click", () => {
        header.classList.remove("menu-open");
    });
});




let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (header.classList.contains('menu-open')) return;

    const currentScrollY = window.scrollY;

    // If scrolling down and not at the very top
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
});




function countAnimation(htmlElement, targetNumber, animationDuration) {

    // This variable represents the number currently being shown
    // It is a let variable because the value changes
    let currentNumber = 0;

    // This variable constant represents an estimate of how often the browser updates the screen
    // It helps calculate how much the number in the counting animation should increase per frame
    const frameRate = 1000 / 60;

    // This variable constant represents how much the number should increase each frame
    const animationIncrement = targetNumber / (animationDuration / frameRate);

    // This function updates the number once per animation frame
    function countNumbers() {
        currentNumber += animationIncrement;

        // Tells function to stop the animation if the final number is reached
        if (currentNumber >= targetNumber) {
            htmlElement.textContent = targetNumber;
        } else {
            // Used "Math.floor" or else decimals would appear on screen
            htmlElement.textContent = Math.floor(currentNumber);
            // This line tells the browser to run the function again on the next animation frame
            requestAnimationFrame(countNumbers);
        }
    }

    // This calls function for the first time so the loop can start
    countNumbers();

}

// This variable constant represents the <p> tag with application number inside
const applicationNumber = document.querySelector(".job-number-container p");

// This variable constant represents the <p> tag with interview number inside
const interviewNumber = document.querySelector(".interview-number-container p");

// This variable constant represents the <p> tag with the offer number inside
const offerNumber = document.querySelector(".offer-number-container p");

// This line controls animation delay time for applications
setTimeout(() => {
    applicationNumber.style.opacity = "1";
    countAnimation(applicationNumber, 738, 3000);
}, 500);

// This line controls animation delay time for interviews
setTimeout(() => {
    interviewNumber.style.opacity = "1";
    countAnimation(interviewNumber, 9, 300);
}, 4000);

// This line controls animation delay for offers
setTimeout(() => {
    offerNumber.style.opacity = "1";
    countAnimation(offerNumber, 1, 50);
}, 5000);


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
function showApplications() {

    // "application" is the actual <li> element in the current interation of the loop
    // "index" is a local variable representing the numeric position of the current <li> item
    applications.forEach((application, index) => {
        // This line is a ternary operator showing only the first set of "visibleApplications" and hiding the rest
        application.style.display = index < visibleApplications ? "block" : "none";
    });
}