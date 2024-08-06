let canvas;
let world;
let keyboard = new Keyboard();
let audio = new Audio();
let isMuted = true;
//let backgroundSound = new Audio('audio/background.mp3');
//let startGameSound = new Audio('audio/start_char.mp3');
audio.backgroundSound.loop = true;

let sounds = [backgroundSound, startGameSound];
let soundPositions = { backgroundSound: 0, startGameSound: 0 };
let startGameSoundPlayed = false;

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function toggleMute() {
  isMuted = !isMuted;
  sounds.forEach((sound) => {
    if (isMuted) {
      // Speichern der aktuellen Zeit, falls sie gültig ist
      soundPositions[sound.src] = sound.currentTime || 0; // Wenn sound.currentTime ungültig ist, wird 0 verwendet
      if (sound === audio.startGameSound) {
        sound.volume = 0; // Lautstärke auf 0 setzen, um den Ton auszuschalten
      } else {
        sound.pause(); // Pausiere andere Sounds
      }
    } else {
      // Wiederherstellen der gespeicherten Zeit, falls sie gültig ist
      sound.currentTime = soundPositions[sound.src] || 0; // Wenn soundPositions[sound.src] ungültig ist, wird 0 verwendet
      if (sound === audio.startGameSound) {
        sound.volume = 1; // Lautstärke auf 1 setzen, um den Ton einzuschalten
      } else {
        sound.play(); // Spiele andere Sounds ab
      }
    }
  });

  const muteIcon = document.getElementById('muteIcon');
  if (isMuted) {
    muteIcon.src = './img/instruction/sound_off.svg';
  } else {
    muteIcon.src = './img/instruction/sound_on.svg';
  }
}

function startGame() {
  closeStartScreen();
  loadingScreen();
  initLevel();
  init();
  if (!isMuted && backgroundSound.paused) {
    //audio.backgroundSound
    backgroundSound.play(); //audio.backgroundSound
  }
}

function loadingScreen() {
  document.getElementById('loadingScreen').classList.remove('d-none');
  setTimeout(() => {
    if (!isMuted) {
      //startGameSound.play();
      audio.startGameSound.play();
    }
    document.getElementById('loadingScreen').classList.add('d-none');
    document.getElementById('mobileButtons').classList.remove('d-none');
    document.getElementById('fullscreenButton').classList.remove('d-none');
  }, 700);
}

function closeStartScreen() {
  document.getElementById('startGameScreen').classList.add('d-none');
  document.getElementById('gameScreen').classList.remove('d-none');
}

function fullscreen() {
  let canvas = document.getElementById('canvas');
  enterScreen(canvas);
}

function enterFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
}

function exitFullScreen() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function winGame() {
  document.getElementById('winGameScreen').classList.remove('d-none');
  document.getElementById('mobileButtons').classList.add('d-none');
  stopGame();
  exitFullScreen();
  //backgroundSound.pause(); // Stop the when returning to the menu
  //backgroundSound.currentTime = 0; // Reset the sound
  audio.backgroundSound.pause(); // Stop the when returning to the menu
  audio.backgroundSound.currentTime = 0; // Reset the sound
}

function loseGame() {
  document.getElementById('loseGameScreen').classList.remove('d-none');
  document.getElementById('mobileButtons').classList.add('d-none');
  stopGame();
  exitFullScreen();
  //backgroundSound.pause(); // Stop the when returning to the menu
  //backgroundSound.currentTime = 0; // Reset the sound
  audio.backgroundSound.pause(); // Stop the when returning to the menu
  audio.backgroundSound.currentTime = 0; // Reset the sound
}

function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

function restartGame() {
  document.getElementById('loseGameScreen').classList.add('d-none');
  document.getElementById('winGameScreen').classList.add('d-none');
  //loseSound.pause();
  //loseSound.currentTime = 0;
  //winSound.pause();
  //winSound.currentTime = 0;
  //winSound2.pause();
  //winSound2.currentTime = 0;
  audio.loseSound.pause();
  audio.loseSound.currentTime = 0;
  audio.winSound.pause();
  audio.winSound.currentTime = 0;
  audio.winSound2.pause();
  audio.winSound2.currentTime = 0;

  startGame();
}

function backToMenu() {
  document.getElementById('loseGameScreen').classList.add('d-none');
  document.getElementById('winGameScreen').classList.add('d-none');
  document.getElementById('gameScreen').classList.add('d-none');
  document.getElementById('fullscreenButton').classList.add('d-none');
  document.getElementById('startGameScreen').classList.remove('d-none');
  //loseSound.pause();
  //loseSound.currentTime = 0;
  //winSound.pause();
  //winSound.currentTime = 0;
  //winSound2.pause();
  //winSound2.currentTime = 0;
  audio.loseSound.pause();
  audio.loseSound.currentTime = 0;
  audio.winSound.pause();
  audio.winSound.currentTime = 0;
  audio.winSound2.pause();
  audio.winSound2.currentTime = 0;
}
