let selectedTime = 0; 
let timeLeft = 0; 
let countdown = null; 
let timerStarted = false;

const timeButtons = document.querySelectorAll(".time-btn");
const timerDisplay = document.getElementById("timer-display");

// Handle test duration selection
timeButtons.forEach(button => {
    button.addEventListener("click", function() {
        selectedTime =this.dataset.time; // Get selected time from data attribute
        timeLeft = selectedTime * 60; // Convert minutes to seconds
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;// Display initial time
        resetTest(); // Reset the test when a new time is selected
    });
});

function resetTest() {
    clearInterval(countdown);// Clear any existing countdown timer
    timerStarted = false;
    startTime = null; // Reset test start time
    wordTimes = []; // Reset typing speed tracker
    timer = null; // Reset typing timer
    current_index = 0; // Reset word index
    input_field.value = ""; // Clear input
    input_field.disabled = false; // Enable input
    display();// Re-display the words with highlight at the start
    updatewpm();// Reset WPM counter
}

function startTimer() {
    if (timerStarted || selectedTime === 0) return; // Prevent multiple timers from starting
    timerStarted = true;

    countdown = setInterval(() => {
        timeLeft--; // Decrease remaining time
        timerDisplay.textContent = `Time Left: ${timeLeft}s`; // Update timer display
        
        if (timeLeft <= 0) {
            clearInterval(countdown);// Stop the timer
            endTest();
        }
    }, 1000);
}

function endTest() {
    input_field.disabled = true;// Disable input field when test ends 
    alert(`Time's up! Your final WPM is: ${wpm_counter.textContent}`);// Show final WPM in an alert
}
let org="An elf loved his pet ant. He tried to feed him the best he could. The ant gobbled whatever the elf would feed him. As time passed and as the ant kept gobbling, it got bigger and bigger till he couldn't fit in the room. Reluctantly, the elf gave the ant to the zoo. Everyone knew the elf's ant at the zoo, and over time, the ant became known as the 'elephant.' Today, when people go to see the elephant in the zoo, they don't know the story behind its odd name.";
let words=org.split(" ");
let current_index=0;//Tracks the current word the user is typing
let timer=null;

const text_box=document.getElementById("text-box");
const input_field=document.getElementById("input-field");
const wpm_counter=document.getElementById("wpm-counter");

function display()// Function to display words with highlighting
{
    text_box.innerHTML=words.map((word,index) => 
        index===current_index? 
        `<span class= "highlight">${word}</span>`:word)
    .join(" ");
}

let startTime = null; // Store test start time
let wordTimes = []; // Track time for each correctly typed word

function updatewpm() {
    if (!startTime || wordTimes.length <2) return; // Don't calculate if test hasn't started
    
    let lastFiveTimes = wordTimes.slice(-5); // Get the last 5 word times
    let elapsed_time = (lastFiveTimes[lastFiveTimes.length - 1] - startTime) / 60000; // Convert ms to minutes

    let wpm = Math.round((wordTimes.length / elapsed_time) || 0); // Calculate WPM
    wpm_counter.textContent = `WPM: ${wpm}`; // Update display
}

// Start timer on first keystroke
input_field.addEventListener("keydown", function (event) {
    if (!startTime) startTime = Date.now(); // Start timer on first keypress
});

        

// Event listener for user input
input_field.addEventListener("keydown", async function (event) {
    if (!selectedTime) {
        alert("Please select a test duration first.");
        return;
    }
    startTimer();

    if (event.key === " ") {
        event.preventDefault();// Prevent default space behavior

        let typed_word = input_field.value.trim();
        let expected_word = words[current_index];

        if (typed_word === expected_word) {
        if (!timer) timer = Date.now(); // Start the timer when first word is typed
        wordTimes.push(Date.now());
        await aiRandomWordChange(current_index); 
        current_index++;
        input_field.value = "";
        display();// Update text display with new highlight
        updatewpm();// Update WPM counter
    }
    else {
        input_field.classList.add("shake");// Add shake effect on incorrect word
        setTimeout(() => {
            input_field.classList.remove("shake");// Remove shake effect after delay
        }, 300); 
    }
}
});
display();// Initialize the text display