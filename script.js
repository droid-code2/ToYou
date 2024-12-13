// Create a global audio object
const audio = new Audio("music/Recording.m4a");

// Toggle play/pause for the audio and apply visual effects
function togglePlay() {
    const personalMessage = document.getElementById('personal-message');
    const visualEffects = document.getElementById('visual-effects');
    const songSection = document.getElementById('song-section');

    if (audio.paused) {
        audio.play().then(() => {
            personalMessage.style.display = 'block';
            setTimeout(() => personalMessage.style.opacity = 1, 10); // Ensure display is set before opacity transition starts
            visualEffects.style.display = 'block';
            songSection.classList.add('music-playing-effect');
        }).catch(error => console.error("Error attempting to play audio:", error));
    } else {
        audio.pause().then(() => {
            personalMessage.style.opacity = 0;
            setTimeout(() => {
                personalMessage.style.display = 'none';
                visualEffects.style.display = 'none';
                songSection.classList.remove('music-playing-effect');
            }, 1000); // Transition for fade out, then hide elements
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

// Reset seek bar when the song ends
audio.addEventListener('ended', function() {
    audio.currentTime = 0;
    document.getElementById('seek-bar').value = 0;
    updateTimerDisplay(0, audio.duration);
    document.getElementById('personal-message').style.opacity = 0;
    setTimeout(() => document.getElementById('personal-message').style.display = 'none', 1000);
    document.getElementById('visual-effects').style.display = 'none';
    document.getElementById('song-section').classList.remove('music-playing-effect');
});

// Function to show a dedicated message
function dedicateSong() {
    alert('Hope You Like The Song!');
}

// Switch between sections (Message, Gallery, Song)
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}
