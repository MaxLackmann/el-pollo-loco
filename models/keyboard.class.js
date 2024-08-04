class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  SHIFT = false;
  W = false;
  A = false;
  S = false;
  D = false;
  F = false;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindKeyPressEvents();
      this.bindButtonsPressEvents();
    });
  }

  bindKeyPressEvents() {
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
  }

  bindButtonsPressEvents() {
    document
      .getElementById('mobileLeft')
      .addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.LEFT = true;
      });

    document.getElementById('mobileLeft').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    document
      .getElementById('mobileRight')
      .addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.RIGHT = true;
      });

    document.getElementById('mobileRight').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });

    document
      .getElementById('mobileJump')
      .addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.SPACE = true;
        this.UP = true;
        this.W = true;
      });

    document.getElementById('mobileJump').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.SPACE = false;
      this.UP = false;
      this.W = false;
    });

    document
      .getElementById('mobileThrow')
      .addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.F = true;
        this.SHIFT = true;
      });

    document.getElementById('mobileThrow').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.F = false;
      this.SHIFT = false;
    });
  }
}
