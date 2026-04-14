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



// MOST FREQUENT DATE & MONTH FEATURE

// Function converts ISO (YYYY-MM-DD) string to local Date object
// By default, JavaScript interprets ISO strings as UTC and shift the date back by a day, making this function necessary
function parseLocalDate(isoString) {

    // This line splits each ISO string into an array by splitting between each dash
    // Then turning the string into Number data type
    // Constant variable deconstructs the array so year, month, and day have their own values
    const [year, month, day] = isoString.split("-").map(Number);

    // Return new Date object in local time zone
    // Subtract 1 from month since JavaScript Date constructor has 0 based months
    return new Date(year, month - 1, day);
}

// Function to collect all date data
function getAllDates() {

    // This constant variable represents all elements with "application" class
    // "..." is used to spread the application elements in an array and stores it inside the const
    const applicationElements = [...document.querySelectorAll(".application")];

    // This line returns date-data value for each application element and stores them as strings in an array
    return applicationElements.map(applicationElements => applicationElements.dataset.date);
}

// Function to extract just the month from a full date string
function extractMonth(isoString) {

    // This line slices the day part off the end of the date string, so only month and year return
    return isoString.slice(0, 7);
}

// Function with a parameter for an array of date values stored as strings
function countDateFrequencies(dateValues) {

    // This constant variable creates a new Map
    const map = new Map();

    // Loop through every date string in the dateValues array
    dateValues.forEach(value => {

        // Updates the number of times a date value appears in the Map
        map.set(value, (map.get(value) || 0) + 1);
    });

    // Return the updated Map
    return map;
}

// Function to find the most frequent date with parameter for a Map, which has key-value pairs
// The key is the date string
// This value is the number of times the date occurs
function findMostFrequent(map) {

    // This variable will eventually store the date string with highest frequency
    // Begins null because nothing has been examined yet
    let maxDate = null;

    // This variable will eventually store the highest count so far
    // Begins at 0 because nothing has been examined yet
    let maxCount = 0;

    // Loops through all Map entries and puts them in pairs of "[date string, count]"
    for (const [date, count] of map.entries()) {

        // Checks if the current date (count) is greater than the highest count (maxCount) looped through so far
        if (count > maxCount) {
            maxDate = date;
            maxCount = count;
        }
    }

    // Returns an object with the most frequent date (maxDate) and how often it appeared (maxCount)
    return { date: maxDate, count: maxCount };
}

// Function with a parameter for an ISO string (YYYY-MM-DD) and turns it to a newly formatted date string (Month Day, Year)
function formatDate(isoString) {

    // Calls the previous parseLocalDate function in order to get the correct date and stores it inside a constant variable
    const date = parseLocalDate(isoString);

    // Converts Date object to new format and returns it
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Function to format a month string (YYYY-MM) into a newly formatted month string ("Month Year")
function formatMonth(isoMonth) {

    // This line separates month and year from date string, turns them to a number, then stores them in constant variables
    const [year, month] = isoMonth.split("-").map(Number);

    // Converts Date object to new format ("Month Year") and returns the result
    // Subtract 1 from month since JavaScript month index begins at 0
    return new Date(year, month - 1).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long"
    });
}

// Function to perform main goal of the feature and display the date with highest application frequency
function showMostFrequentDate() {

    // Calls previous getAllDates function and stores the resulting array in a constant variable
    const dates = getAllDates();

    // Passes the array of date strings (dates) into countDateFrequencies function and then stores the result in a constant variable
    const frequency = countDateFrequencies(dates);

    // Calls findMostFrequent function and stores the resulting object in a constant variable
    const result = findMostFrequent(frequency);

    // This constant variable represents where the most frequent date will be displayed in the HTML
    const output = document.querySelector(".most-frequent-date");

    // If statement used to skip display step in case the output element is not found
    if (output) {

        // Clears previous content from the element where the output is displayed
        // Important in case the date were to change in the future
        output.innerHTML = "";

        // Calls formatDate function and produces the new date string format ("November 27, 2025") and stores it inside a constant variable
        const formatted = formatDate(result.date);

        // Splits the date string at each space and stores each word in a new variable
        const [month, dayWithComma, year] = formatted.split(" ");

        // Removes comma and stores it inside a new constant variable
        const day = dayWithComma.replace(",", "");

        // This group of lines creates 4 <span> elements and stores them in constant variables
        const monthElement = document.createElement("span");
        const dayElement = document.createElement("span");
        const yearElement = document.createElement("span");
        const countElement = document.createElement("span");

        // This group of lines fills each <span> with the correct information
        monthElement.textContent = month;
        dayElement.textContent = day;
        yearElement.textContent = year;
        countElement.textContent = `${result.count} applications`;

        // This group of lines adds CSS classes to each of the <span> elements so they can be styled individually
        monthElement.classList.add("most-frequent-date-month");
        dayElement.classList.add("most-frequent-date-day");
        yearElement.classList.add("most-frequent-date-year");
        countElement.classList.add("most-frequent-date-count");

        // This group of lines adds each <span> to the .most-frequent-date container
        output.appendChild(monthElement);
        output.appendChild(dayElement);
        output.appendChild(yearElement);
        output.appendChild(countElement);
    }

    // Returns the final date object if ever needed to be used for other purposes
    return result;
}

// Function to find and display the month with most job applications
function showMostFrequentMonth() {

    // Calls previous getAllDates function and stores the resulting array in a constant variable
    const dates = getAllDates();

    // Convert each full date to only the month portion and stores the results in a constant variable
    const months = dates.map(extractMonth);

    // Calls previous countDateFrequencies function to count how frequent each month is and stores results in a constant variable
    const frequency = countDateFrequencies(months);

    // Calls findMostFrequent function and stores the resulting object in a constant variable
    const result = findMostFrequent(frequency);

    // This constant variable represents where the most frequent date will be displayed in the HTML
    const output = document.querySelector(".most-frequent-month");

    // If statement used to skip display step in case the output element is not found
    if (output) {

        // Clears previous content from the element where the output is displayed
        // Important in case the date were to change in the future
        output.innerHTML = "";

        // Calls formatDate function and produces the new date string format ("August 2025") and stores it inside a constant variable
        const formatted = formatMonth(result.date);

        // Splits the month name and year apart so they can be styled separately
        const [monthName, year] = formatted.split(" ");

        // This group of lines creates 2 <span> elements and stores them in constant variables
        const monthElement = document.createElement("span");
        const yearElement = document.createElement("span");
        const countElement = document.createElement("span");

        // This group of lines fills each <span> with the correct information
        monthElement.textContent = monthName;
        yearElement.textContent = year;
        countElement.textContent = `${result.count} applications`;

        // This group of lines adds CSS classes to each of the <span> elements so they can be styled individually
        monthElement.classList.add("most-frequent-month-name");
        yearElement.classList.add("most-frequent-month-year");
        countElement.classList.add("most-frequent-month-count");

        // This group of lines adds each <span> to the .most-frequent-month container
        output.appendChild(monthElement);
        output.appendChild(yearElement);
        output.appendChild(countElement);
    }

    // Returns the final date object if ever needed to be used for other purposes
    return result;
}

// Call the functions to actually run them
showMostFrequentDate();

showMostFrequentMonth();



// APPLICATION METHOD BAR CHART FEATURE

// This group of lines creates labels for application methods so when information is displayed, the names are more easily reabable
const methodLabels = {
    companyWebsite: "Company website",
    dice: "Dice",
    indeed: "Indeed",
    inPerson: "In person",
    linkedin: "LinkedIn",
    ziprecruiter: "ZipRecruiter"
};

// A function that scans through applications list and returns an object with counts for each application method
function getApplicationMethodStats() {

    // This line grabs all elements with ".application" class and stores them in a constant variable
    const applications = document.querySelectorAll(".application");

    // This group of lines initializes all application methods so they can then be counted, starting from 0
    const stats = {
        companyWebsite: 0,
        dice: 0,
        indeed: 0,
        inPerson: 0,
        linkedin: 0,
        ziprecruiter: 0
    };

    // This group of lines loops through every application element
    // "application" represents the current application being looped through
    // If the loop detects a child element with any of the following classes, then its respective stats is increased by 1
    applications.forEach(application => {
        if (application.querySelector(".company-website")) stats.companyWebsite++;
        if (application.querySelector(".dice")) stats.dice++;
        if (application.querySelector(".indeed")) stats.indeed++;
        if (application.querySelector(".in-person")) stats.inPerson++;
        if (application.querySelector(".linkedin")) stats.linkedin++;
        if (application.querySelector(".ziprecruiter")) stats.ziprecruiter++;
    });

    // Returns stats object
    return stats;
}

// Function which takes stats from the previous function and turns it to a bar chart
function renderApplicationMethodBarChart(stats) {

    // This constant variable locates where in the HTML the bar chart will be rendered
    const barChartContainer = document.querySelector(".application-method-bar-chart");

    // This line clears the bar chart container before drawing new bars, which prevents duplicate charts if the function runs more than once
    barChartContainer.innerHTML = "";

    // Takes the numeric counts from stats object and puts them in an array and stores it in a constant variable
    const values = Object.values(stats);
    
    // This line sums together all the numbers in the "values" array
    // "total" is constant variable representing the total number of applications across all application methods
    const total = values.reduce((a, b) => a + b, 0);

    // This constant variable represents the largest count (currently LinkedIn)
    // Necessary so the bars in the chart can be scaled proportionally
    const max = Math.max(...values);

    // Loops through each application method and returns 2 results
    // "method" represents the application method and "count" represents the number of applications for that method
    Object.entries(stats).forEach(([method, count]) => {

        // This line calculates percentages using a ternary operator
        // If total is 0, then percent will be 0 too in order to avoid any division by 0
        // If total is more than 0, it will calculate the percentage
        const percent = total === 0 ? 0 : (count / total) * 100;

        // This group of lines creates a <div> containing the bar and label
        const column = document.createElement("div");
        column.className = "application-method-column";

        // This group of lines creates the bars and styles them in proportion to the highest (max) count
        const bar = document.createElement("div");
        bar.className = "application-method-bar";
        bar.style.width = `${(count / max) * 100}%`;

        // This group of lines creates a <div> to display percent
        const percentLabel = document.createElement("div");
        percentLabel.className = "percent-label";

        // Gets the readable application method name from methodLabels and displays it in percentLabel
        // Also rounds percentages to 1 decimal place
        percentLabel.textContent = `${methodLabels[method]} — ${percent.toFixed(1)}%`;

        // This group of lines adds the bar and percent label to the column container so they all appear together
        column.appendChild(bar);
        column.appendChild(percentLabel);
        
        // This line adds the complete column to the main bar chart container
        barChartContainer.appendChild(column);
    });
}

// This line tells the script to wait until HTML is loaded before initializing functions
document.addEventListener("DOMContentLoaded", () => {

    // Calls the getApplicationMethodStats function from earlier which returns an object with each application method and its count, then stores the results in a constant variable
    const stats = getApplicationMethodStats();

    // Pass the results of the previous function to the function which actually turns it to a bar chart
    renderApplicationMethodBarChart(stats);
});



// INTERVIEW PERCENTAGE FEATURE

// Function that calculates and returns the percentage of applications with ".interviewed" class
function getInterviewPercentage() {

    // This line selects all elements with ".application" class and stores them in a constant variable
    const applications = document.querySelectorAll(".application");

    // This constant variable represents how many applications there are
    const applicationsTotal = applications.length;

    // This line initializes the counter to track how many "interviewed" applications are present
    // Begins counting at zero
    // Uses "let" variable since value will change
    let interviewedCount = 0;

    // This line loops through every ".application" element
    applications.forEach(application => {

        // If the loop finds an element with ".interviewed" class, then it increases interviewedCount by 1
        if (application.querySelector(".interviewed")) {
            interviewedCount++;
        }
    });

    // A ternary operator that calculates the percentage of interviewedCount
    // It also handles division by 0 and will set the percentage to 0 if there are no ".interviewed" applications detected
    const percent = applicationsTotal === 0 ? 0 : (interviewedCount / applicationsTotal) * 100;

    // Returns the percentage amount and rounds to 1 decimal point
    return percent.toFixed(1);
}

// This function displays percentage on website
function renderInterviewPercentage() {

    // This line calls the previous function and stores the result in a constant variable
    const percent = getInterviewPercentage();

    // This line is a constant variable representing the HTML element where the percentage is displayed
    const percentContainer = document.querySelector(".interview-percentage");

    // Writes "percent" variable into "percentContainer" variable so the percentage can be seen on screen
    percentContainer.textContent = `${percent}%`;
}

// This line waits until the HTML is loaded before running the function
document.addEventListener("DOMContentLoaded", () => {

    // Calls renderInterviewPercentage function so it can display on website
    renderInterviewPercentage();
});



// OFFER PERCENTAGE FEATURE

function getOfferPercentage() {

    // This line selects all elements with ".application" class and stores them in a constant variable
    const applications = document.querySelectorAll(".application");

    // This constant variable represents how many applications there are
    const applicationsTotal = applications.length;

    // This line initializes the counter to track how many applications with ".offer" are present
    // Begins counting at zero
    // Uses "let" variable since value will change
    let offerCount = 0;

    // This line loops through every ".application" element
    applications.forEach(application => {

        // If the loop finds an element with ".offer" class, then it increases offerCount by 1
        if (application.querySelector(".offer")) {
            offerCount++;
        }
    });

    // A ternary operator that calculates the percentage of offerCount
    // It also handles division by 0 and will set the percentage to 0 if there are no ".offer" applications detected
    const percent = applicationsTotal === 0 ? 0 : (offerCount / applicationsTotal) * 100;

    // Returns the percentage amount and rounds to 1 decimal point
    return percent.toFixed(1);
}

// This function displays percentage on website
function renderOfferPercentage() {

    // This line calls the previous function and stores the result in a constant variable
    const percent = getOfferPercentage();

    // This line is a constant variable representing the HTML element where the percentage is displayed
    const percentContainer = document.querySelector(".offer-percentage");

    // Writes "percent" variable into "percentContainer" variable so the percentage can be seen on screen
    percentContainer.textContent = `${percent}%`;
}

// This line waits until the HTML is loaded before running the function
document.addEventListener("DOMContentLoaded", () => {

    // Calls renderOfferPercentage function so it can display on website
    renderOfferPercentage();
});



// RESPONSE BAR CHART



// SORT APPLICATIONS FEATURE

// This variable creates an empty array which is used to store <li> elements in original DOM order
// By nature, the original order is from newest to oldest because I entered them in that sequence
// Used "let" since the value will change later
// Each time the sorting feature is used, it starts from this original order
let originalApplicationsOrder = [];

// This line creates an event listener to run the following code only after HTML is loaded
document.addEventListener("DOMContentLoaded", () => {

    // This constant variable represents the element with the class "applications-list"
    // ".applications-list" is the <ol> element containing all applications
    const applicationsList = document.querySelector(".applications-list");

    // This line selects all elements with the "application" class and stores them in the empty array
    originalApplicationsOrder = Array.from(applicationsList.querySelectorAll(".application"));

    // This line runs the sort function once the page loads so the applications list is displayed correctly from the start
    sortFeature();
});

// This group of lines attaches event listeners to each of the <select> elements
// It means the handleSort function will run any time any of the <select> elements change
document.getElementById("time-sort").addEventListener("change", sortFeature);
document.getElementById("location-sort").addEventListener("change", sortFeature);
document.getElementById("applied-sort").addEventListener("change", sortFeature);
document.getElementById("status-sort").addEventListener("change", sortFeature);

// The function that sorts applications
function sortFeature() {

    // This group of lines reads the current value of each <select> element and then stores it in a constant variable
    // Necessary so the sortFeature function knows what logic to apply for each <select>
    const time = document.getElementById("time-sort").value;
    const location = document.getElementById("location-sort").value;
    const applied = document.getElementById("applied-sort").value;
    const status = document.getElementById("status-sort").value;
    
    // This constant variable represents the element with the class "applications-list"
    // It has to be repeated since the first instance is outside the sortFeature function scope
    const applicationsList = document.querySelector(".applications-list");

    // This variable creates a fresh copy of the original applications list
    let allApplications = [...originalApplicationsOrder];

    // This constant variable creates an arrow function and stores its results in a new array called filtered
    // The filtered array stores all the results which return true in the following code
    const filtered = allApplications.filter(application => {

        // This group of lines check whether an application contains the class matching the chosen option
        // If an application returns false, it will be excluded from the results
        // If an application retusn true, it will be included in the results
        if (location && !application.querySelector(".location." + location)) return false;

        if (applied && !application.querySelector("." + applied)) return false;

        if (status && !application.querySelector("." + status)) return false;

        return true;
    });

    // This line reverses the allApplications array if the "oldest" option is chosen
    if (time === "oldest") {
        filtered.reverse();
    }

    // This line removes all applications from the HTML so an updated filtered list can be added
    applicationsList.innerHTML = "";

    // This line adds back the newly sorted and filtered application list
    // "application" is a parameter for the arrow function, representing the application being sorted through by forEach
    filtered.forEach(application => applicationsList.appendChild(application));

    // This line ensures only the first 10 results of the newly sorted list appear
    visibleApplications = 10;

    // This line calls the showApplications function from the "see more" button feature
    showApplications();
}



// SEE MORE APPLICATIONS BUTTON FEATURE

// This function returns all elements with "application" class so the list can be updated if sorted later
function getApplications() {
    return document.querySelectorAll(".applications-list > .application");
}

// This constant variable represents the "see more" button
const button = document.querySelector(".button-container button");

// This variable allows only the first 10 applications to be shown
let visibleApplications = 10;

// Calls the function to ensure website loads with correct number of visible applications
showApplications();

// This group of lines adds an event listener to the "see more" button
// So each time the button is clicked, a new set of applications will appear
button.addEventListener("click", () => {
    visibleApplications += 10;
    showApplications();
});

// This function gets the current list of applications, decides which ones should be visible, then hides the rest
function showApplications() {

    // Calls the getApplications function to get the current number of applications which should be shown and stores it inside a constant variable
    const currentApplications = getApplications();

    // These lines loop through each application to decide which ones should be seen
    // "application" represents the actual HTML element
    // "index" represents the numeric position of the application element
    currentApplications.forEach((application, index) => {

        // Ternary operator telling the page to only display applications if the index is less than the value of visibleApplications
        application.style.display = index < visibleApplications ? "block" : "none";
    });

    // Ternary operator telling the page to only show the "see more" button if there are more applications beyond the visible ones
    // If the length of the value of currentApplications is greater than the value of visibleApplications, continue displaying the button
    // If currentApplications is less than visibleApplications, hide the button since there are no more results to show
    button.style.visibility = currentApplications.length > visibleApplications ? "visible" : "hidden";
}