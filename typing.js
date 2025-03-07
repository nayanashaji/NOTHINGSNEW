let selectedTime = 0; 
let timeLeft = 0; 
let countdown = null; 
let timerStarted = false;

const timeButtons = document.querySelectorAll(".time-btn");
const timerDisplay = document.getElementById("timer-display");

// Handle test duration selection
timeButtons.forEach(button => {
    button.addEventListener("click", function() {
        selectedTime =this.dataset.time; 
        timeLeft = selectedTime * 60; 
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        resetTest(); 
    });
});

function resetTest() {
    clearInterval(countdown);
    timerStarted = false;
    timer = null; // Reset typing timer
    current_index = 0; // Reset word index
    input_field.value = ""; // Clear input
    input_field.disabled = false; // Enable input
    display();
    updatewpm();
}

function startTimer() {
    if (timerStarted || selectedTime === 0) return; // Start only once
    timerStarted = true;

    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            endTest();
        }
    }, 1000);
}

function endTest() {
    input_field.disabled = true; 
    alert(`Time's up! Your final WPM is: ${wpm_counter.textContent}`);
}
let org="An elf loved his pet ant. He tried to feed him the best he could. The ant gobbled whatever the elf would feed him. As time passed and as the ant kept gobbling, it got bigger and bigger till he couldn't fit in the room. Reluctantly, the elf gave the ant to the zoo. Everyone knew the elf's ant at the zoo, and over time, the ant became known as the 'elephant.' Today, when people go to see the elephant in the zoo, they don't know the story behind its odd name.";
let words=org.split(" ");
let current_index=0;
let timer=null;

const text_box=document.getElementById("text-box");
const input_field=document.getElementById("input-field");
const wpm_counter=document.getElementById("wpm-counter");

function display()
{
    text_box.innerHTML=words.map((word,index) => 
        index===current_index? 
        `<span class= "highlight">${word}</span>`:word)
    .join(" ");
}

function updatewpm()
{
    if(!timer) return;
    let elapsed_time=(Date.now()-timer)/60000;
    let wpm=Math.round((current_index/elapsed_time)||0);
    wpm_counter.textContent= `WPM: ${wpm}`;
}
input_field.addEventListener("keydown", async function (event) {
    if (!selectedTime) {
        alert("Please select a test duration first.");
        return;
    }
    startTimer();
    if (event.key === " ") {
        event.preventDefault();

        let typed_word = input_field.value.trim();
        let expected_word = words[current_index];

        if (typed_word === expected_word) {
        if (!timer) timer = Date.now(); 
        await aiRandomWordChange(current_index); 
        current_index++;
        input_field.value = "";
        display();
        updatewpm();
    }
    else {
        input_field.classList.add("shake");
        setTimeout(() => {
            input_field.classList.remove("shake");
        }, 300); 
    }
}
});
display();