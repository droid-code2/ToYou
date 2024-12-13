// Create a global audio object
const audio = new Audio("music/Recording.m4a");

// Global variable to track the playing state of the audio
let isPlaying = false;

// Hide heartfelt on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('heartfelt-message').style.display = 'none';
});

// Toggle play/pause for the audio and apply visual effects
function togglePlay() {
    const personalMessage = document.getElementById('personal-message');
    const visualEffects = document.getElementById('visual-effects');
    const songSection = document.getElementById('song-section');
    const heartfeltMessage = document.getElementById('heartfelt-message');

    if (audio.paused) {
        audio.play().then(() => {
            personalMessage.style.display = 'block';
            setTimeout(() => personalMessage.style.opacity = 1, 10); // Ensure display is set before opacity transition starts
            visualEffects.style.display = 'block';
            songSection.classList.add('music-playing-effect');
            if (songSection.classList.contains('active')) {
                heartfeltMessage.style.display = 'block'; // Only show if song section is active
            }
            isPlaying = true;
        }).catch(error => console.error("Error attempting to play audio:", error));
    } else {
        audio.pause().then(() => {
            personalMessage.style.opacity = 0;
            setTimeout(() => {
                personalMessage.style.display = 'none';
                visualEffects.style.display = 'none';
                songSection.classList.remove('music-playing-effect');
                heartfeltMessage.style.display = 'none'; // Always hide when paused
                isPlaying = false;
            }, 1000);
        }).catch(error => console.error("Error attempting to pause audio:", error));
    }
}

// Update time bar as song plays
audio.addEventListener('timeupdate', function() {
    const seekBar = document.getElementById('seek-bar');
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    if (!isNaN(duration)) {
        seekBar.value = (currentTime / duration) * 100;
    }
    updateTimerDisplay(currentTime, duration);
});

// Time adjust song
document.getElementById('seek-bar').addEventListener('input', function() {
    const duration = audio.duration;
    if (!isNaN(duration)) {
        audio.currentTime = (this.value * duration) / 100;
    }
});

// Update time and duration display
function updateTimerDisplay(currentTime, duration) {
    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    const currentTimeDisplay = formatTime(currentTime);
    const durationDisplay = isNaN(duration) ? "00:00" : formatTime(duration);
    document.getElementById('time-display').textContent = `${currentTimeDisplay} / ${durationDisplay}`;
}

// Reset time bar when song ends
audio.addEventListener('ended', function() {
    audio.currentTime = 0;
    document.getElementById('seek-bar').value = 0;
    updateTimerDisplay(0, audio.duration);
    document.getElementById('personal-message').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('personal-message').style.display = 'none';
        document.getElementById('visual-effects').style.display = 'none';
        document.getElementById('song-section').classList.remove('music-playing-effect');
        document.getElementById('heartfelt-message').style.display = 'none'; // Also reset message display
        isPlaying = false;
    }, 1000);
});

// Function to show song message
function dedicateSong() {
    alert('Hope You Like The Song!');
}

// Function to switch between sections (Message, Gallery, Song)
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');

    // Heartfelt message display
    const heartfeltMessage = document.getElementById('heartfelt-message');
    if (sectionId === 'song-section' && isPlaying) {
        heartfeltMessage.style.display = 'block';
    } else {
        heartfeltMessage.style.display = 'none';
    }
}
