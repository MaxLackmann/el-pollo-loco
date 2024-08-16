let canvas;
let world;
let keyboard = new Keyboard();
let soundmanager = new Soundmanager();

/**
 * Initializes the game by setting up the canvas and world objects.
 * @return {void} This function does not return a value.
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, soundmanager);
}

document.addEventListener('DOMContentLoaded', (event) => {
  if (!soundmanager) {
    soundmanager = new Soundmanager();
  }
  playBackgroundSound();
});

/**
 * Toggles the mute state of the sound manager and plays the background sound if it's not muted.
 * @return {void} This function does not return a value.
 */
function toggleMute() {
  if (soundmanager) {
    soundmanager.toggleMute();
    if (!soundmanager.isMuted) {
      playBackgroundSound();
    }
  }
}

/**
 * Starts the game by closing the start screen, displaying the loading screen, initializing the level, and initializing the game.
 * @return {void} This function does not return a value.
 */
function startGame() {
  closeStartScreen();
  loadingScreen();
  initLevel();
  init();
}

/**
 * Displays the loading screen for a short duration before transitioning to the game interface.
 * @return {void}
 */
function loadingScreen() {
  showLoadingScreen();
  setTimeout(() => {
    playStartSounds();
    hideLoadingScreen();
    showFullScreenButton();
    showMobileButtons();
  }, 700);
}

/**
 * Displays the loading screen by removing the 'd-none' class from the 'loadingScreen' element.
 * @return {void} This function does not return a value.
 */
function showLoadingScreen() {
  document.getElementById('loadingScreen').classList.remove('d-none');
}

/**
 * Hides the loading screen by adding the 'd-none' class to the 'loadingScreen' element.
 * @return {void} This function does not return a value.
 */
function hideLoadingScreen() {
  document.getElementById('loadingScreen').classList.add('d-none');
}

/**
 * Plays the start game sound and background sound if the sound manager is not muted.
 * @return {void} This function does not return a value.
 */
function playStartSounds() {
  if (!soundmanager.isMuted) {
    soundmanager.startGameSound.play();
    if (soundmanager.backgroundSound.paused) {
      soundmanager.backgroundSound.play();
    }
  }
}

function showMobileButtons() {
  if (window.innerHeight <= 700) {
    document
      .getElementById('mobileButtons')
      .classList.add('mobile-buttons-activate');
  }
}

/**
 * Displays the game buttons by removing the 'd-none' class from the 'mobileButtons' and 'fullscreenButton' elements.
 * @return {void} This function does not return a value.
 */
function showFullScreenButton() {
  document.getElementById('fullscreenButton').classList.remove('d-none');
}

/**
 * Closes the start game screen and displays the game screen.
 * @return {void} This function does not return a value.
 */
function closeStartScreen() {
  document.getElementById('startGameScreen').classList.add('d-none');
  document.getElementById('gameScreen').classList.remove('d-none');
}

/**
 * Enters full screen mode for the canvas element.
 * @return {void} This function does not return a value.
 */
function fullscreen() {
  let canvas = document.getElementById('canvas');
  enterFullScreen(canvas);
}

/**
 * Enters full screen mode for the given element if supported by the browser.
 * @param {HTMLElement} element - The element to enter full screen mode for.
 * @return {void} This function does not return a value.
 */
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

/**
 * Exits full screen mode if it is currently active.
 * @return {void} This function does not return a value.
 */
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

/**
 * Executes the win game logic by showing the win screen, hiding game buttons,
 * stopping the game, exiting fullscreen mode, hiding the fullscreen button,
 * and stopping the background sound.
 * @return {void} This function does not return a value.
 */
function winGameScreen() {
  showWinScreen();
  hideMobileButtons();
  stopGame();
  exitFullScreen();
  hideFullScreenButton();
  stopBackgroundSound();
}

/**
 * Shows the win game screen by removing the 'd-none' class from the element with the id 'winGameScreen'.
 * @return {void} This function does not return a value.
 */
function showWinScreen() {
  document.getElementById('winGameScreen').classList.remove('d-none');
}

/**
 * Hides the game buttons by adding the 'd-none' class to the element with the id 'mobileButtons'.
 * @return {void}
 */
function hideMobileButtons() {
  document
    .getElementById('mobileButtons')
    .classList.remove('mobile-buttons-activate');
}

/**
 * Executes the lose game logic by showing the lose screen, hiding game buttons,
 * stopping the game, exiting fullscreen mode, hiding the fullscreen button,
 * and stopping the background sound.
 * @return {void} This function does not return a value.
 */
function loseGameScreen() {
  showLoseScreen();
  hideMobileButtons();
  stopGame();
  exitFullScreen();
  hideFullScreenButton();
  stopBackgroundSound();
}

/**
 * Displays the "lose game" screen by removing the 'd-none' class from the
 * HTML element with the ID 'loseGameScreen'.
 * @return {void} This function does not return anything.
 */
function showLoseScreen() {
  document.getElementById('loseGameScreen').classList.remove('d-none');
}

/**
 * Stops all intervals by clearing them one by one.
 * @return {void} This function does not return a value.
 */
function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * Restarts the game by hiding the end screens, resetting the audio, playing the background sound, and starting the game.
 * @return {void} This function does not return a value.
 */
function restartGame() {
  hideEndScreens();
  resetAudio();
  playBackgroundSound();
  startGame();
}

/**
 * Hides the game end screens by adding the 'd-none' class to the HTML elements with the IDs 'loseGameScreen' and 'winGameScreen'.
 * @return {void} This function does not return a value.
 */
function hideEndScreens() {
  document.getElementById('loseGameScreen').classList.add('d-none');
  document.getElementById('winGameScreen').classList.add('d-none');
}

/**
 * Restarts the game by hiding the end screens, showing the start game screen,
 * hiding the game screen, hiding the full screen button, resetting the audio,
 * and playing the background sound.
 * @return {void} This function does not return a value.
 */
function backToMenu() {
  hideEndScreens();
  showStartGameScreen();
  hideGameScreen();
  hideFullScreenButton();
  resetAudio();
  playBackgroundSound();
}

/**
 * Displays the start game screen by removing the 'd-none' class from the HTML element with the ID 'startGameScreen'.
 * @return {void} This function does not return a value.
 */
function showStartGameScreen() {
  document.getElementById('startGameScreen').classList.remove('d-none');
}

/**
 * Hides the game screen by adding the 'd-none' class to the HTML element with the ID 'gameScreen'.
 * @return {void} This function does not return a value.
 */
function hideGameScreen() {
  document.getElementById('gameScreen').classList.add('d-none');
}

/**
 * Hides the fullscreen button by adding the 'd-none' class to the element with the ID 'fullscreenButton'.
 * @return {void} This function does not return a value.
 */
function hideFullScreenButton() {
  document.getElementById('fullscreenButton').classList.add('d-none');
}

/**
 * Stops the background sound by pausing it and resetting its current time to 0.
 * @return {void} This function does not return a value.
 */
function stopBackgroundSound() {
  if (soundmanager && soundmanager.backgroundSound) {
    soundmanager.backgroundSound.pause();
    soundmanager.backgroundSound.currentTime = 0;
  }
}

/**
 * Resets the audio by pausing and rewinding all sounds managed by the soundmanager.
 * @return {void} This function does not return a value.
 */
function resetAudio() {
  if (soundmanager) {
    const sounds = [
      soundmanager.loseSound,
      soundmanager.winSound,
      soundmanager.winSound2,
    ];

    sounds.forEach((sound) => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
  }
}

/**
 * Plays the background sound if it's not muted, otherwise pauses it and resets its current time to 0.
 * @return {void} This function does not return a value.
 */
function playBackgroundSound() {
  if (soundmanager) {
    if (!soundmanager.isMuted) {
      if (soundmanager.backgroundSound.paused) {
        soundmanager.backgroundSound.play();
      }
    } else {
      soundmanager.backgroundSound.pause();
      soundmanager.backgroundSound.currentTime = 0;
    }
  }
}

/**
 * Checks if the game is over by verifying the character's energy and the endboss's energy.
 * @param {Object} world - The game world object containing character and endboss data.
 * @return {void}
 */
function checkGameOver(world) {
  checkCharacterEnergy(world);
  checkEndbossEnergy(world);
}

/**
 * Checks if the character's energy has reached zero and triggers a game loss if so.
 * @return {void}
 */
function checkCharacterEnergy() {
  if (world.character.energy <= 0) {
    this.loseGame();
  }
}

/**
 * Checks if the endboss's energy has reached zero and triggers a game win if true.
 * @return {void} No return value, triggers winGame function if condition is met
 */
function checkEndbossEnergy() {
  world.level.endboss.forEach((endboss) => {
    if (endboss.energyEndboss <= 0) {
      this.winGame();
    }
  });
}

/**
 * Executes the game over logic by showing the game over screen, playing the lose sound, and pausing the walking sound.
 * @return {void} This function does not return a value.
 */
function loseGame() {
  setTimeout(() => {
    loseGameScreen();
    this.playSound(soundmanager.loseSound);
    soundmanager.walkingSound.pause();
  }, 300);
}

/**
 * Executes the game win logic by showing the win game screen, playing the win sound, and pausing the walking sound.
 * @return {void} This function does not return a value.
 */
function winGame() {
  setTimeout(() => {
    winGameScreen();
    this.playSound(soundmanager.winSound);
    this.playSound(soundmanager.winSound2);
    soundmanager.walkingSound.pause();
  }, 300);
}

/**
 * Plays a sound if it is not muted.
 * @param {Object} soundName - The sound object to be played.
 * @return {void} This function does not return a value.
 */
function playSound(soundName) {
  if (!soundmanager.isMuted) {
    soundName.pause();
    soundName.currentTime = 0;
    soundName.play();
  }
}
