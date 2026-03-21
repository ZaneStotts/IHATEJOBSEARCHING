// HEADER MENU OPEN/CLOSE FEATURE

// This variable constant represents the header element
const header = document.querySelector("header");

// This variable constant represents the menu button
const menuButton = document.querySelector(".open-menu");

// Event listener tells the arrow function to run when the menu button is clicked
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

// DISAPPEAR HEADER ON SCROLL FEATURE

// This variable represents the user's initial scroll position
// Uses "let" instead of "const" because the value will be changing
// The value of this variable is used to compare against future scroll positions in order to detect if user is scrolling up or down
let lastScroll = window.scrollY;

// This event listener listens for every time page is scrolled
window.addEventListener("scroll", () => {

    // This line tells the header not to move out out of view if menu is open
    if (header.classList.contains("menu-open")) return;

    // This variable constant represents user's current scroll position
    // The value of this variable is compared against lastScroll to determine scroll direction
    const currentScroll = window.scrollY;

    // This if statement tracks if user scrolls down
    // If currentScroll is greater than lastScroll and also more than 30 pixels from the top, then it activates the "header-hidden" class in order to make header slide up
    if (currentScroll > lastScroll && currentScroll > 30) {
        header.classList.add("header-hidden");

        darkModeButton.classList.add("dark-mode-hidden");

    // This line tells website to remove "header-hidden" class and allow header to be seen if user scrolls up
    } else {
        header.classList.remove("header-hidden");

        darkModeButton.classList.remove("dark-mode-hidden");
    }

    // This line updates the value of lastScroll to the currentScroll value
    // This needs to happen so lastScroll can againcompare values with currentScroll when another scroll event occurs
    lastScroll = currentScroll;
});

// CLICK OUTSIDE HEADER TO CLOSE FEATURE

// This event listener listens for a click anywhere in the screen
// "event" is an object automatically created by the browser each time something happens, which in this case is a click
document.addEventListener("click", (event) => {

  // This line means the code runs only if the menu is open
  if (!header.classList.contains("menu-open")) return;

  // This line returns true if a click is inside the header
  // Makes sure not to close header if click occurs inside it
  // "event.target" stores information about what element was clicked on
  if (header.contains(event.target)) return;

  // This line tells header to close by removing "menu-open" class if a click occurs anywhere outside the header
  header.classList.remove("menu-open");
});

// DARK MODE FEATURE

// This variable constant represents the dark mode button itself
const darkModeButton = document.querySelector(".dark-mode-button");

// This variable constant represents the <html> element
const root = document.documentElement;

// "colorKey" stores user's color preference
// This line tells the website to activate "dark-mode" class if "dark" is the value last saved in "colorKey"
if (localStorage.getItem("colorKey") === "dark") {
    root.classList.add("dark-mode");
}

// This line adds an event listener that runs an arrow function when dark mode button is clicked
darkModeButton.addEventListener("click", () => {

    // This line adds or removes the "dark-mode" class to the <html> element
    root.classList.toggle("dark-mode");

    // This line asks if root (which is the <html> element) contains the "dark-mode class"
    // This variable constant stores boolean values, true ("dark") or false ("light")
    const isDark = root.classList.contains("dark-mode");

    // This line saves the current color preference to localStorage
    // Used a ternary operator as a compacted if else statement
    // This line asks if isDark is true ("dark") or false ("light") and stores the answer in "colorKey"
    localStorage.setItem("colorKey", isDark ? "dark" : "light");
});

// WELCOME PAGE NUMBER COUNTER FEATURE

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

// SORT APPLICATIONS FEATURE


// Cache original order on page load
let originalOrder = [];

document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector(".applications-list");
    originalOrder = Array.from(list.querySelectorAll(".application"));
    handleSort();
});

// Attach listeners
document.getElementById("time-sort").addEventListener("change", handleSort);
document.getElementById("location-sort").addEventListener("change", handleSort);
document.getElementById("applied-sort").addEventListener("change", handleSort);
document.getElementById("status-sort").addEventListener("change", handleSort);

function handleSort() {
    const time = document.getElementById("time-sort").value;
    const location = document.getElementById("location-sort").value;
    const applied = document.getElementById("applied-sort").value;
    const status = document.getElementById("status-sort").value;

    const list = document.querySelector(".applications-list");

    // Start with original order
    let items = [...originalOrder];

    // 1. FILTER
    const filtered = items.filter(item => {
        // LOCATION
        if (location && !item.querySelector(".location." + location)) return false;

        // APPLICATION METHOD
        if (applied && !item.querySelector("." + applied)) return false;

        // STATUS
        if (status && !item.querySelector("." + status)) return false;

        return true;
    });

    // 2. SORT BY TIME (reverse or not)
    if (time === "oldest") {
        filtered.reverse();
    }

    // 3. CLEAR LIST FIRST
    list.innerHTML = "";

    // 4. INSERT FILTERED ITEMS
    filtered.forEach(item => list.appendChild(item));

    // 5. RESET VISIBLE COUNT
    visibleApplications = 10;

    // 6. SHOW FIRST 10 OF FILTERED LIST
    showApplications();
}


// SEE MORE APPLICATIONS BUTTON FEATURE

// Instead of a static NodeList, make this a function
function getApplications() {
    return document.querySelectorAll(".applications-list > .application");
}

// "See more" button
const button = document.querySelector(".button-container button");

// Start with 10 visible applications
let visibleApplications = 10;

// Show the first set on page load
showApplications();

// Reveal 10 more when button is clicked
button.addEventListener("click", () => {
    visibleApplications += 10;
    showApplications();
});

// Show/hide applications based on visibleApplications
function showApplications() {
    const applications = getApplications(); // always fresh list

    applications.forEach((application, index) => {
        application.style.display = index < visibleApplications ? "block" : "none";
    });

    // Hide button if all items are visible
    button.style.visibility = applications.length > visibleApplications ? "visible" : "hidden";
}