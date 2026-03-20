// --- NEW AUDIO LOGIC ---
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
let isPlaying = false;

function toggleAudio() {
    if (isPlaying) {
        bgMusic.pause();
        muteBtn.innerText = "🔇 Putar Musik";
        isPlaying = false;
    } else {
        // We use a promise here to catch any browser blocking errors
        let playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Playback started successfully
                muteBtn.innerText = "🔊 Bisukan";
                isPlaying = true;
            }).catch(error => {
                // Playback failed
                console.error("Audio playback failed:", error);
                alert("Make sure your song file is named 'song.mp3' and is in the same folder!");
            });
        }
    }
}
// -----------------------

const scenes = [
    document.getElementById('scene1'),
    document.getElementById('scene2'),
    document.getElementById('scene3'),
    document.getElementById('scene4'),
    document.getElementById('scene5')
];

// We need to keep track of the timers so we can cancel them if needed
let timers = [];

function hideAllScenes() {
    scenes.forEach(scene => {
        scene.classList.remove('active');
    });
}

function clearTimers() {
    timers.forEach(timer => clearTimeout(timer));
    timers = [];
}

function startSequence() {
    clearTimers();
    hideAllScenes(); 

    // Show Moon at 0.5 seconds
    timers.push(setTimeout(() => {
        scenes[0].classList.add('active');
    }, 500));

    // Hide Moon, Show Greeting at 4 seconds
    timers.push(setTimeout(() => {
        scenes[0].classList.remove('active');
        scenes[1].classList.add('active');
    }, 4000));

    // Hide Greeting, Show Message at 8 seconds
    timers.push(setTimeout(() => {
        scenes[1].classList.remove('active');
        scenes[2].classList.add('active');
    }, 8000));

    // Hide Message, Show Signature & THR Request at 13 seconds
    // The sequence stops here to wait for the user to click a button
    timers.push(setTimeout(() => {
        scenes[2].classList.remove('active');
        scenes[3].classList.add('active');
    }, 13000));
}

// Triggered when they click "I Sent THR!"
function showThanks() {
    hideAllScenes();
    // Reveal the final thank you scene
    scenes[4].classList.add('active');
}

// Triggered when they click "Send via DANA"
function goToDana() {
    // 1. Paste your DANA link between the quotation marks below!
    const myDanaLink = "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012012019071702245065"; 
    
    // 2. Open the DANA link in a new tab
    window.open(myDanaLink, '_blank');
    
    // 3. Move the website to the Thank You scene
    showThanks();
}

// Start the sequence automatically when the webpage loads
window.onload = startSequence;