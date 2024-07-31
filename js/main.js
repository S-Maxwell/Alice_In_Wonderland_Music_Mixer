console.log("javascript file is linked");

 // JavaScript for drag-and-drop functionality and audio control
 
 document.addEventListener('DOMContentLoaded', () => {
    let button = document.querySelector('#hamburger');
    let burgerCon = document.querySelector('.burger-con');
    let albumCovers = document.querySelectorAll('#track-list li audio');
    let theAudioEl = document.querySelector('#track-display #audioMain');
    let playButton = document.querySelector('#play-button');
    let pauseButton = document.querySelector('#pause-button');
    let resetButton = document.querySelector('#reset');
    let spinPlates = document.querySelectorAll('.jockey');
    let buttonSpan = document.querySelector('#track-display nav div');
    let effectControl = document.querySelectorAll('.effect-control li');
    let trackList = document.getElementById('track-list');
    let infoPlay = document.querySelector('.infoPlay');
    let trackItems = document.querySelectorAll('#track-list li');
    let puzzlePieces = document.querySelectorAll('.img-wrapper img');
    let dropZones = document.querySelectorAll('.undefined-drop .img-wrapper');
    let selectedTrackName;
    let draggedPiece;

    let mainTrackPlaying = false;

    function buttonReset() {
        location.reload();
    }

    function handleStartDrag() { 
        console.log('started dragging this piece:', this);
        draggedPiece = this;
    }

    function handleDragOver(event) { 
        event.preventDefault(); 
        console.log('dragged over me'); 
    }

    function handleDrop(event) {
        event.preventDefault();
        console.log('dropping something on me');

        if (this.children.length === 0) {
            this.appendChild(draggedPiece);
        } else {
            console.log('puzzle piece in zone ');
        }
        
        let dropZone = this.closest('.undefined-drop');
        if (dropZone) {
            dropZone.querySelector('span').textContent = 'Playing';
            dropZone.querySelector('span').classList.add('droppings');
        }
        let minitrack = draggedPiece.getAttribute("data-minitrack");

        if (mainTrackPlaying) {
            let audio = document.querySelector(`audio[data-minitrack="${minitrack}"]`);
            audio.loop = true;
            audio.play();
        }

        event.target.closest('li').classList.add('dropeffectshadow');
    }

    albumCovers.forEach(cover => cover.addEventListener('click', loadAudio));

    trackItems.forEach(cover => cover.addEventListener('click', function() {
        loadAudio.call(this);
        pauseAudio();
        selectedTrackName = this.querySelector('p').textContent;
        console.log('track selected');
    }));

    trackList.addEventListener('click', function(event) {
        let trackItem = event.target.closest('li');
        if (trackItem) {
            let audioElement = trackItem.querySelector('audio');
            if (audioElement) {
                loadAudio.call(audioElement);
                let trackName = trackItem.querySelector('p').textContent;
                infoPlay.textContent = "Playing " + trackName;
            }
        }
    });

    function shadowEffect(event) {
        document.querySelectorAll('.effect-control li').forEach(function(item) {
            item.classList.remove('effectshadow');
        });

        let listItem = event.target.closest('li');
        if (listItem) {
            listItem.classList.add('effectshadow');
            console.log('Shadow Effect Added to Effect Controls');

            switch (listItem.id) {
                case 'echo':
                    document.getElementById('container').style.backgroundImage = 'url(images/dark.svg)';
                    break;
                case 'scracth':
                    document.getElementById('container').style.backgroundImage = 'url(images/grint.svg)';
                    break;
                case 'reverb':
                    document.getElementById('container').style.backgroundImage = 'url(images/hacp.svg)';
                    break;
                case 'pitch':
                    document.getElementById('container').style.backgroundImage = 'url(images/sci.svg)';
                    break;
                default:
                    break;
            }
        }
    }

    document.querySelectorAll('.effect-control li').forEach(function(item) {
        item.addEventListener('click', shadowEffect);
    });

    function noSpan() {
        buttonSpan.style.animation = 'none';
    }

    function loadAudio() {
        let newSrc = `audio/${this.dataset.trackref}.wav`;
        theAudioEl.src = newSrc;
        theAudioEl.dataset.trackref = this.dataset.trackref;
        theAudioEl.load();

        console.log("New source:", newSrc);
    }

    function playAudio() {
        if (selectedTrackName) {
            theAudioEl.play(); 

            spinPlates.forEach(function(spinPlate) {
                spinPlate.classList.add('jockey');
            });
            buttonSpan.style.animation = 'bounce 1s infinite alternate';
            infoPlay.textContent = "Now Playing " + selectedTrackName ;
            console.log("Playing");
        } else {
            console.log("No track selected. Cannot play.");
        }
        mainTrackPlaying = true;
    }

    function pauseAudio() {
        theAudioEl.pause();
        spinPlates.forEach(function(spinPlate) {
            spinPlate.classList.remove('jockey');
        });
        buttonSpan.style.animation = 'none';
        mainTrackPlaying = false;

        console.log("Disk Rotation Removed");
        console.log("Paused");
    }

    hamburgerMenu = () => {
        burgerCon.classList.toggle('burger-con');
        console.log("Menu Track toggled");
    };

    function resetPuzzle() {
        puzzlePieces.forEach(function(piece) {
            if (piece.parentElement.classList.contains('drop-zone')) {
                puzzleBoard.appendChild(piece);
            }
        });

        puzzlePieces.forEach(function(piece) {
            document.querySelector(".img-wrapper").appendChild(piece);
        });

        dropZones.forEach(function(zone) {
            zone.style.backgroundImage = '';
        });
    }

    button.addEventListener('click', hamburgerMenu, false);
    pauseButton.addEventListener('click', pauseAudio);
    playButton.addEventListener('click', playAudio);
    document.addEventListener('DOMContentLoaded', noSpan);
    effectControl.forEach(shadow => shadow.addEventListener('click', shadowEffect));
    resetButton.addEventListener('click', buttonReset);

    puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
    dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));
    dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));
    resetButton.addEventListener("click", resetPuzzle);
});
