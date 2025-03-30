// Get the images
const h0 = document.getElementById("H0");
const h1 = document.getElementById("H1");
const m0 = document.getElementById("M0");
const m1 = document.getElementById("M1");
const s0 = document.getElementById("S0");
const s1 = document.getElementById("S1");

const transition_time = 0.1 // seconds
let lastNow = new Date();  

function updateTimer() {
    let now = new Date();  
    let hours = now.getHours().toString().padStart(2, '0');  
    let minutes = now.getMinutes().toString().padStart(2, '0');  
    let seconds = now.getSeconds().toString().padStart(2, '0');  

    h0.src = `images/output/${hours[0]}.png`;
    h1.src = `images/output/${hours[1]}.png`;
    m0.src = `images/output/${minutes[0]}.png`;
    m1.src = `images/output/${minutes[1]}.png`;
    s0.src = `images/output/${seconds[0]}.png`;
    s1.src = `images/output/${seconds[1]}.png`;

    lastNow = now;
}

setInterval(updateTimer, 1000); // Updates the timer every second
