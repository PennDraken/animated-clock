// Get the images
const h0 = document.getElementById("H0");
const h1 = document.getElementById("H1");
const m0 = document.getElementById("M0");
const m1 = document.getElementById("M1");
const s0 = document.getElementById("S0");
const s1 = document.getElementById("S1");
const frames_per_transition = { 
    "0-1": 12, 
    "1-2": 4, 
    "2-3": 6, 
    "3-4": 6, 
    "4-5": 5, 
    "5-6": 5, 
    "6-7": 4, 
    "7-8": 12, 
    "8-9": 7, 
    "9-0": 7,
    "3-0": 7,
    "5-0": 4
};

const transition_time = 700 // milliseconds
let lastNow = new Date();
let oldHours   = lastNow.getHours().toString().padStart(2, '0');  
let oldMinutes = lastNow.getMinutes().toString().padStart(2, '0');  
let oldSeconds = lastNow.getSeconds().toString().padStart(2, '0');

async function animateContainer(container, path, maxFrames) {
    console.log(path);
    console.log(maxFrames);
    if (maxFrames==undefined) {
        return;
    }
    const update_interval = Math.round(transition_time/maxFrames);
    let frame = 1;
    
    // Function to update the container with the new image
    const updateImage = () => {
        if (frame < maxFrames) {
            const imageSrc = `${path}_${frame}.png`;
            container.src = imageSrc; // Update the image source
            frame++;
        } else {
            clearInterval(interval); // Stop the animation when maxFrames is reached
        }
    };

    // Set the interval to update the image every `update_interval` ms
    const interval = setInterval(updateImage, update_interval);

    // Wait until all frames have been displayed
    return new Promise(resolve => {
        const checkInterval = setInterval(() => {
            if (frame >= maxFrames) {
                clearInterval(checkInterval); // Stop checking once all frames are shown
                resolve(); // Resolve the promise once animation is done
            }
        }, update_interval);
    });
}

async function updateTimer() {
    const animations = []; // Store all animation promises
    
    let now = new Date();  
    let hours = now.getHours().toString().padStart(2, '0');  
    let minutes = now.getMinutes().toString().padStart(2, '0');  
    let seconds = now.getSeconds().toString().padStart(2, '0');

    // Animate all numbers which should be animated at the same time
    if (oldHours[0] !== hours[0]) {
        const transitionName = `${oldHours[0]}-${hours[0]}`;
        const maxFrames = frames_per_transition[transitionName];
        const path = 'images/output/' + transitionName;
        animations.push(animateContainer(h0, path, maxFrames));
        
    }
    if (oldHours[1] !== hours[1]) {
        const transitionName = `${oldHours[1]}-${hours[1]}`;
        const maxFrames = frames_per_transition[transitionName];
        const path = 'images/output/' + transitionName;
        animations.push(animateContainer(h1, path, maxFrames));
    }
    
    if (oldMinutes[0] !== minutes[0]) {
        const transitionName = `${oldMinutes[0]}-${minutes[0]}`;
        const maxFrames = frames_per_transition[transitionName];
        const path = 'images/output/' + transitionName;
        animations.push(animateContainer(m0, path, maxFrames));
        
    }
    if (oldMinutes[1] !== minutes[1]) {
        const transitionName = `${oldMinutes[1]}-${minutes[1]}`;
        const maxFrames = frames_per_transition[transitionName];
        const path = 'images/output/' + transitionName;
        animations.push(animateContainer(m1, path, maxFrames));
    }
    
    if (oldSeconds[0] !== seconds[0]) {
        const transitionName = `${oldSeconds[0]}-${seconds[0]}`;
        const maxFrames = frames_per_transition[transitionName];
        const path = 'images/output/' + transitionName;
        animations.push(animateContainer(s0, path, maxFrames));
        
    }
    if (oldSeconds[1] !== seconds[1]) {
        const transitionName = `${oldSeconds[1]}-${seconds[1]}`;
        const maxFrames = frames_per_transition[transitionName];
        const path = 'images/output/' + transitionName;
        animations.push(animateContainer(s1, path, maxFrames));
    }

    // Wait until all animateContainers has finished
    await Promise.all(animations);

    h0.src = `images/output/${hours[0]}.png`;
    h1.src = `images/output/${hours[1]}.png`;
    m0.src = `images/output/${minutes[0]}.png`;
    m1.src = `images/output/${minutes[1]}.png`;
    s0.src = `images/output/${seconds[0]}.png`;
    s1.src = `images/output/${seconds[1]}.png`;

    lastNow = now;
    oldHours   = hours;  
    oldMinutes = minutes;  
    oldSeconds = seconds;
}

updateTimer()
setInterval(updateTimer, 1000); // Updates the timer every second
