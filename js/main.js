console.log("javascript file is linked");

 // JavaScript for drag-and-drop functionality and audio control
 document.addEventListener('DOMContentLoaded', () => {
    const audioElements = document.querySelectorAll('.trackref');
    const dropBoxes = document.querySelectorAll('.undefined-drop');

    dropBoxes.forEach(dropBox => {
        dropBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropBox.classList.add('dragover');
        });

        dropBox.addEventListener('dragleave', () => {
            dropBox.classList.remove('dragover');
        });

        dropBox.addEventListener('drop', (e) => {
            e.preventDefault();
            const trackRef = e.dataTransfer.getData('trackref');
            const audioElement = document.querySelector(`audio[data-trackref="${trackRef}"]`);
            if (audioElement) {
                dropBox.appendChild(audioElement);
                audioElement.play();
            }
            dropBox.classList.remove('dragover');
        });
    });

    const puzzleImages = document.querySelectorAll('.puzzle-image');
    puzzleImages.forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('trackref', e.target.dataset.minitrack);
        });
    });

    document.getElementById('play-button').addEventListener('click', () => {
        document.getElementById('audioMain').play();
    });

    document.getElementById('pause-button').addEventListener('click', () => {
        document.getElementById('audioMain').pause();
    });

    document.getElementById('minus-button').addEventListener('click', () => {
        const audio = document.getElementById('audioMain');
        audio.volume = Math.max(0, audio.volume - 0.1);
    });

    document.getElementById('plus-button').addEventListener('click', () => {
        const audio = document.getElementById('audioMain');
        audio.volume = Math.min(1, audio.volume + 0.1);
    });

    document.getElementById('reset').addEventListener('click', () => {
        const audio = document.getElementById('audioMain');
        audio.pause();
        audio.currentTime = 0;
    });
});