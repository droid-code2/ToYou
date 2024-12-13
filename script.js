// Create a global audio object
const audio = new Audio("music/Recording.m4a");

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Update the seek bar as the song plays
audio.addEventListener('timeupdate', function() {
    const seekBar = document.getElementById('seek-bar');
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    if (!isNaN(duration)) {
        seekBar.value = (currentTime / duration) * 100;
    }
    updateTimerDisplay(currentTime, duration);
});

// Allow user to seek within the song
document.getElementById('seek-bar').addEventListener('input', function() {
    const duration = audio.duration;
    if (!isNaN(duration)) {
        audio.currentTime = (this.value * duration) / 100;
    }
});

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
});




// Switch between sections (Message, Gallery, Song)
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}
