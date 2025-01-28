// Categories for the routine generator
const categories = {
    breathing: ["Deep breathing for 5 minutes", "Morning meditation", "Mindful breathing", "Box breathing"],
    physicalActivity: ["Light stretching", "10-minute cardio", "Yoga session", "Bodyweight exercises"],
    nutrition: ["Drink a glass of water", "Have a healthy breakfast", "Prepare a smoothie", "Drink coffee"],
    function: ["Write down 3 tasks for the day", "Organize your workspace", "Review your goals for the day", "Check emails"]
};

let lastGenerationTime = 0;
const cooldownPeriod = 10000; // 10 seconds in milliseconds

let audioElements = [];
let currentSongIndex = 0;
let isMuted = false;

const generateBtn = document.getElementById('generateBtn');
const routineDisplay = document.getElementById('routineDisplay');
const muteButton = document.getElementById('muteButton');
const playButton = document.getElementById('playButton');
const blurbs = document.querySelectorAll('.blurb');

// Initialize audio player
function initAudioPlayer() {
    audioElements = [
        new Audio('songs/kneeheight%20master%2033.wav')
        // Add more songs here if needed
    ];

    muteButton.addEventListener('click', toggleMute);
    playButton.addEventListener('click', playCurrentSong);

    audioElements.forEach(audio => {
        audio.addEventListener('ended', playNextSong);
    });
}

// Audio player functions
function toggleMute() {
    isMuted = !isMuted;
    audioElements.forEach(audio => {
        audio.muted = isMuted;
    });
    muteButton.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
}

function playNextSong() {
    audioElements[currentSongIndex].pause();
    currentSongIndex = (currentSongIndex + 1) % audioElements.length;
    playCurrentSong();
}

function playCurrentSong() {
    audioElements[currentSongIndex].play().catch(e => {
        console.error("Autoplay failed:", e);
    });
}

// Generate routine function
function generateRoutine() {
    const currentTime = Date.now();
    if (currentTime - lastGenerationTime < cooldownPeriod) {
        const remainingTime = Math.ceil((cooldownPeriod - (currentTime - lastGenerationTime)) / 1000);
        alert(`Please wait ${remainingTime} seconds before generating a new routine.`);
        return;
    }

    routineDisplay.innerHTML = '';

    Object.keys(categories).forEach(category => {
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim();
        routineDisplay.appendChild(categoryTitle);

        const tasks = categories[category];
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        const taskElement = document.createElement('div');
        taskElement.className = `task ${category}`;
        taskElement.textContent = randomTask;
        routineDisplay.appendChild(taskElement);

        // Simple fade-in animation
        taskElement.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(fadeIn);
            }
            taskElement.style.opacity = opacity;
            opacity += 0.1;
        }, 50);
    });

    lastGenerationTime = currentTime;
}

// Rotating header blurbs
let currentBlurbIndex = 0;

function rotateBlurbs() {
    blurbs.forEach((blurb, index) => {
        blurb.classList.toggle('active', index === currentBlurbIndex);
    });
    currentBlurbIndex = (currentBlurbIndex + 1) % blurbs.length;
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', () => {
    generateBtn.addEventListener('click', generateRoutine);
    initAudioPlayer();
    rotateBlurbs(); // Start rotation immediately
    setInterval(rotateBlurbs, 10000); // Change blurb every 10 seconds
});