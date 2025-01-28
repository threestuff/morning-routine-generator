// Routine Categories
const categories = {
    breathing: ["Deep breathing for 5 minutes", "Morning meditation"],
    physicalActivity: ["Light stretching", "Yoga session"],
    nutrition: ["Drink water", "Healthy breakfast"],
    function: ["Write down 3 tasks", "Review goals"]
};

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const routineDisplay = document.getElementById('routineDisplay');

// Audio System
let audioElements = [];
let currentSongIndex = 0;
let isMuted = false;

// Initialize Application
function init() {
    setupEventListeners();
    initAudioPlayer();
    startBlurbRotation();
}

// Event Listeners Setup
function setupEventListeners() {
    generateBtn.addEventListener('click', generateRoutine);
    document.addEventListener('DOMContentLoaded', init);
}

// Audio Player Functions
function initAudioPlayer() {
    audioElements = [new Audio('songs/kneeheight.wav')];
    audioElements.forEach(audio => audio.addEventListener('ended', playNextSong));
}

function toggleMute() {
    isMuted = !isMuted;
    audioElements.forEach(audio => audio.muted = isMuted);
}

// Routine Generation
function generateRoutine() {
    routineDisplay.innerHTML = '';
    
    Object.keys(categories).forEach(category => {
        const tasks = categories[category];
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        
        const categoryElement = document.createElement('div');
        categoryElement.innerHTML = `
            <h2>${formatCategoryName(category)}</h2>
            <div class="activity">${randomTask}</div>
        `;
        
        routineDisplay.appendChild(categoryElement);
    });
}

// Helper Functions
function formatCategoryName(category) {
    return category.replace(/([A-Z])/g, ' $1').toUpperCase();
}

function startBlurbRotation() {
    let currentBlurbIndex = 0;
    const blurbs = document.querySelectorAll('.blurb');
    
    setInterval(() => {
        blurbs.forEach(blurb => blurb.classList.remove('active'));
        blurbs[currentBlurbIndex].classList.add('active');
        currentBlurbIndex = (currentBlurbIndex + 1) % blurbs.length;
    }, 10000);
}

// Initialize the application
init();