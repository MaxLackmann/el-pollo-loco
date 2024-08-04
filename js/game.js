let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let backgroundSound = new Audio('audio/background.mp3');
let startGameSound = new Audio('audio/start_char.mp3');
backgroundSound.loop = true;

let sounds = [
  backgroundSound,
  startGameSound,
  Character.walkingSound,
  Character.jumpingSound,
  Character.sleepingSound,
];

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function toggleMute() {
  isMuted = !isMuted;
  sounds.forEach((sound) => {
    sound.muted = isMuted;
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
  if (backgroundSound.paused) {
    backgroundSound.play();
  }
}

function loadingScreen() {
  document.getElementById('loadingScreen').classList.remove('d-none');
  setTimeout(() => {
    startGameSound.play();
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
  backgroundSound.pause(); // Stop the when returning to the menu
  backgroundSound.currentTime = 0; // Reset the sound
}

function loseGame() {
  document.getElementById('loseGameScreen').classList.remove('d-none');
  document.getElementById('mobileButtons').classList.add('d-none');
  stopGame();
  exitFullScreen();
  backgroundSound.pause(); // Stop the when returning to the menu
  backgroundSound.currentTime = 0; // Reset the sound
}

function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

function restartGame() {
  document.getElementById('loseGameScreen').classList.add('d-none');
  document.getElementById('winGameScreen').classList.add('d-none');
  world.loseSound.pause();
  world.loseSound.currentTime = 0;
  world.winSound.pause();
  world.winSound.currentTime = 0;
  world.winSound2.pause();
  world.winSound2.currentTime = 0;
  startGame();
}

function backToMenu() {
  document.getElementById('loseGameScreen').classList.add('d-none');
  document.getElementById('winGameScreen').classList.add('d-none');
  document.getElementById('gameScreen').classList.add('d-none');
  document.getElementById('fullscreenButton').classList.add('d-none');
  document.getElementById('startGameScreen').classList.remove('d-none');
  world.loseSound.pause();
  world.loseSound.currentTime = 0;
  world.winSound.pause();
  world.winSound.currentTime = 0;
  world.winSound2.pause();
  world.winSound2.currentTime = 0;
}
