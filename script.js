function playSong() {
    // Play selected birthday song
    const audio = new Audio('path_to_song.mp3');
    audio.play();
}

// Switch between sections (Message, Gallery, Song)
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}
