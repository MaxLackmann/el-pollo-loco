let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  console.log('my character is', world.character);
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 87) {
    keyboard.W = true;
  }
  if (e.keyCode == 65) {
    keyboard.A = true;
  }
  if (e.keyCode == 83) {
    keyboard.S = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
  if (e.keyCode == 70) {
    keyboard.F = true;
  }
  if (e.keyCode == 16) {
    keyboard.SHIFT = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode === 38) {
    keyboard.UP = false;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode === 87) {
    keyboard.W = false;
  }
  if (e.keyCode === 65) {
    keyboard.A = false;
  }
  if (e.keyCode === 83) {
    keyboard.S = false;
  }
  if (e.keyCode === 68) {
    keyboard.D = false;
  }
  if (e.keyCode === 70) {
    keyboard.F = false;
  }
  if (e.keyCode === 16) {
    keyboard.SHIFT = false;
  }
});

function startGame() {
  closeStartScreen();
  loadingScreen();
  init();
  document.getElementById('loadingScreen').classList.add('d-none');
}

function loadingScreen() {
  document.getElementById('loadingScreen').classList.remove('d-none');
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('d-none');
  }, 1000);
}

function closeStartScreen() {
  document.getElementById('startGameScreen').classList.add('d-none');
  document.getElementById('fullscreen').classList.remove('d-none');
}

function fullscreen() {
  let canvas = document.getElementById('canvas');
  enterFullScreen(canvas);
}

function enterFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Unterstützung für Firefox
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
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
}

function winGame() {
  document.getElementById('winGameScreen').classList.remove('dnone');
  stopGame();
  exitFullScreen();
  console.log('you win');
}

function loseGame() {
  document.getElementById('loseGameScreen').classList.remove('dnone');
  stopGame();
  exitFullScreen();
  console.log('you lose');
}

function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
  console.log('stop game');
}

function restartGame() {
  document.getElementById('loseGameScreen').classList.add('d-none');
  document.getElementById('winGameScreen').classList.add('d-none');
  startGame();
}

function backToMenu() {
  document.getElementById('loseGameScreen').classList.add('d-none');
  document.getElementById('winGameScreen').classList.add('d-none');
  document.getElementById('fullscreen').classList.add('d-none');
  document.getElementById('startGameScreen').classList.remove('d-none');
  console.log('back to menu');
}
