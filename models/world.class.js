class World {
  character = new Character(soundmanager);
  level = level1;
  canvas;
  ctx;
  keyboard;
  soundmanager;
  camera_x = 0;
  statusBar = new Statusbar();
  statusBarCoin = new StatusbarCoin();
  statusBarBottle = new StatusbarBottle();
  statusBarEndboss = new StatusbarEndboss();
  collisionHandler = new collisionHandler(this);
  throwableObjects = [];
  collectedCoins = [];
  collectedBottles = [];
  maxBottles = 5;
  endBossActivated = false;
  lastThrowTime = 0;

  /**
   * Constructs a new instance of the World class.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Keyboard} keyboard - The keyboard object for keyboard input.
   * @param {Soundmanager} soundmanager - The sound manager for managing audio.
   */
  constructor(canvas, keyboard, soundmanager) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundmanager = soundmanager;

    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world property of the character object to the current instance of the class.
   * @return {void} This function does not return a value.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop, handling various game logic and collision checks at regular intervals.
   * @return {void} This function does not return a value.
   */
  run() {
    setInterval(() => {
      setInterval(() => {
        this.collisionHandler.checkCollisions();
        this.collisionHandler.checkCollisionsThrowableObjectsEnemies();
      }, 10);
      this.collisionHandler.checkThrowObjects();
      this.collisionHandler.checkCollisionsThrowableObjectsEndBoss();
      this.collisionHandler.checkCollisionsWithEndboss();
      this.collisionHandler.checkCollisionsCoins();
      this.collisionHandler.checkCollisionsBottles();
      this.updateEndbossDirection();
      this.checkEndbossInRange();
      checkGameOver(this);
    }, 200);
  }

  /**
   * Plays a sound if it is not muted.
   * @param {string} soundName - The name of the sound to play.
   * @return {void} This function does not return a value.
   */
  playSound(soundName) {
    if (!this.soundmanager.isMuted) {
      soundName.pause();
      soundName.currentTime = 0;
      soundName.play();
    }
  }

  /**
   * Updates the direction of all endboss enemies in the level based on the position of the character.
   * @return {void} This function does not return a value.
   */
  updateEndbossDirection() {
    this.level.endboss.forEach((endboss) => {
      endboss.updateDirection(this.character);
    });
  }

  /**
   * Checks if any endboss is in range and activates it if not already activated.
   * @return {void} This function does not return anything.
   */
  checkEndbossInRange() {
    if (!this.endbossActivated) {
      this.level.endboss.forEach((endboss) => {
        if (this.characterInRangeOfEndboss(endboss)) {
          this.activateEndboss(endboss);
        }
      });
    }
  }

  /**
   * Checks if the character is in range of the endboss.
   * @param {Object} endboss - The endboss object.
   * @return {boolean} Returns true if the character is in range of the endboss, false otherwise.
   */
  characterInRangeOfEndboss(endboss) {
    return (
      this.character.x + this.canvas.width > endboss.x &&
      this.character.x < endboss.x + endboss.width
    );
  }

  /**
   * Activates the endboss by playing the boss sound, showing the endboss status bar,
   * starting the endboss movement, and setting the endbossActivated flag to true.
   * @param {Object} endboss - The endboss object to activate.
   */
  activateEndboss(endboss) {
    this.playSound(this.soundmanager.bossSound);
    this.showEndbossStatusBar();
    this.startEndbossMovement(endboss);
    this.endbossActivated = true;
  }

  /**
   * Displays the endboss status bar.
   * @return {void} This function does not return a value.
   */
  showEndbossStatusBar() {
    this.statusBarEndboss.show();
  }

  /**
   * Starts the movement of the endboss.
   * @param {Object} endboss - The endboss object to start moving.
   * @return {void} This function does not return anything.
   */
  startEndbossMovement(endboss) {
    endboss.startMoving();
  }

  /**
   * Draws the world on the canvas by clearing the canvas, translating the canvas to the camera position,
   * adding the background objects to the map, adding the character to the map, adding the end boss to the map,
   * adding the clouds to the map, translating the canvas back to the original position, adding the status bar to the map,
   * adding the status bar coin to the map, adding the status bar bottle to the map, adding the status bar end boss to the map,
   * translating the canvas to the camera position again, adding the enemies to the map, adding the throwable objects to the map,
   * adding the coins to the map, and adding the bottles to the map. Finally, it translates the canvas back to the original position
   * and recursively calls itself to redraw the world on the next frame.
   * @return {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the map.
   * @param {Array} objects - An array of objects to be added to the map.
   * @return {undefined} This function does not return a value.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds the movable object to the map, flips the image if necessary, and draws the object on the canvas.
   * @param {MovableObject} mo - The movable object to be added to the map.
   * @return {void} This function does not return a value.
   */
  addToMap(mo) {
    // mo = movable object
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of a given movable object on the canvas.
   * @param {MovableObject} mo - The movable object to flip.
   * @return {void} This function does not return a value.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips the image back to its original state after flipping.
   * @param {MovableObject} mo - The movable object whose image needs to be flipped back.
   * @return {void} This function does not return a value.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
