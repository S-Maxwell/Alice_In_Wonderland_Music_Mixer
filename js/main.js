console.log("javascript file is linked");

let theKeys = document.querySelectorAll('.key');

function logKeyboardKeyCode(event) { 
    let targetAudio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    let targetDiv = document.querySelector(`div[data-key="${event.keyCode}"]`);

    if (!targetAudio) {
        return;
    }

    targetAudio.currentTime = 0;
    targetAudio.play();

    targetDiv.classList.add('playing'); 
    console.log(targetAudio, targetDiv);
}

function removeHighlight(event) {
    if (event.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

window.addEventListener('keydown', logKeyboardKeyCode);
theKeys.forEach(
    key => key.addEventListener(
        'transitionend',
        removeHighlight
    )
);
