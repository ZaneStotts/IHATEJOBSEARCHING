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

// Calls function to run the application count up to 736 over 2000 milliseconds
countAnimation(applicationNumber, 736, 2000);

// This variable constant represents the <p> tag with interview number inside
const interviewNumber = document.querySelector(".interview-number-container p");

// Calls function to run the interview count up to 9 over 1000 milliseconds
countAnimation(interviewNumber, 9, 1000);

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