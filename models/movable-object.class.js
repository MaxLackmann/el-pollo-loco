class MovableObject extends DrawableObject {
  /**
   * Initializes a new instance of the class.
   * @param {Object} audio - The audio object.
   */
  constructor(audio) {
    super();
    this.soundmanager = audio || {};
    this.speed = 0.15;
    this.otherDirection = false;
    this.speedY = 0;
    this.acceleration = 2.5;
    this.energy = 100;
    this.energyEndboss = 100;
    this.energyCoin = 0;
    this.energyBottle = 0;
    this.lastHit = 0;
    this.immune = false;
    this.offset = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    this.isAngry = false;
  }

  /**
   * Plays a sound if it is not muted.
   * @param {Object} soundName - The sound object to be played.
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
   * Applies gravity to the movable object, updating its vertical position and speed.
   * This function uses a setInterval to continuously update the object's position and speed.
   * It checks if the object is above the ground or if its vertical speed is greater than 0,
   * and if so, updates its position and speed accordingly.
   * @return {void} This function does not return a value.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (this.y >= this.initialY) {
        this.y = this.initialY;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @return {boolean} Returns true if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Checks if the current movable object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check for collision.
   * @return {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Handles the hit event.
   * @return {void} This function does not return a value.
   */
  hit() {
    if (!this.immune) {
      this.activateImmunity();
      this.reduceEnergy(15);
      this.playSound(this.soundmanager.characterHitSound);
      this.updateLastHitTime();
      this.resetImmunityAfterDelay(1000);
    }
  }

  /**
   * Reduces the character's energy by a specified amount.
   * @param {number} amount - The amount of energy to reduce.
   */
  reduceEnergy(amount) {
    this.energy -= amount;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Updates the time of the last hit and last movement.
   */
  updateLastHitTime() {
    this.lastHit = new Date().getTime();
    this.lastMoveTime = Date.now();
  }

  /**
   * Activates the immunity of the object.
   * @return {void} This function does not return a value.
   */
  activateImmunity() {
    this.immune = true;
  }

  /**
   * Resets the immunity status of the character after a specified delay.
   */
  resetImmunityAfterDelay(amount) {
    setTimeout(() => {
      this.immune = false;
    }, amount);
  }

  /**
   * Executes a big hit on the object if it is not immune.
   * @return {void} This function does not return a value.
   */
  bigHit() {
    if (!this.immune) {
      this.activateImmunity();
      this.reduceEnergy(35);
      this.playSound(this.soundmanager.bossAttackSound);
      this.updateLastHitTime();
      this.resetImmunityAfterDelay(1000);
    }
  }

  /**
   * Checks the energy of the endboss and sets the 'isAngry' flag to true if the energy is less than or equal to 20 and the endboss is not already angry.
   * @return {void} This function does not return a value.
   */
  checkEndbossEnergy() {
    if (this.energyEndboss <= 20 && !this.isAngry) {
      this.isAngry = true;
    }
  }

  /**
   * Handles the hit event on the endboss.
   * @return {void} This function does not return a value.
   */
  hitEndboss() {
    if (!this.immune) {
      this.activateImmunity();
      this.reduceEndBossEnergy();
      this.updateLastHitTime();
      this.resetImmunityAfterDelay(200);
      this.checkEndbossEnergy();
      this.checkEndbossAngry();
    }
  }

  /**
   * Checks if the end boss is angry and has less than or equal to 20 energy.
   * @return {void} This function does not return a value.
   */
  checkEndbossAngry() {
    if (this.isAngry && this.energyEndboss <= 20) {
      this.playSound(this.soundmanager.bossAngrySound);
    } else {
      this.playSound(this.soundmanager.bossHitSound);
    }
  }

  /**
   * Reduces the energy of the end boss by 21 units. If the resulting energy is less than 0, it is set to 0.
   * @return {void} This function does not return a value.
   */
  reduceEndBossEnergy() {
    this.energyEndboss -= 21;
    if (this.energyEndboss < 0) {
      this.energyEndboss = 0;
    }
  }

  /**
   * Increases the energy coin value by 10 units, capping at 100.
   * @return {void} This function does not return a value.
   */
  increaseEnergyCoin() {
    this.energyCoin += 10;
    if (this.energyCoin > 100) {
      this.energyCoin = 100;
    }
  }

  /**
   * Increases the energy bottle value by 20 units.
   * @return {void} This function does not return a value.
   */
  increaseEnergyBottle() {
    this.energyBottle += 20;
    if (this.energyBottle > 100) {
      this.energyBottle = 100;
    }
  }

  /**
   * Decreases the energy bottle value by 20 units.
   * @return {void} This function does not return a value.
   */
  decreaseEnergyBottle() {
    this.energyBottle -= 20;
    if (this.energyBottle < 0) {
      this.energyBottle = 0;
    }
  }

  /**
   * Checks if the object is hurt.
   * @return {boolean} Returns true if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // differnce in milliseconds
    timepassed = timepassed / 1000; // in seconds
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead by comparing its energy to zero.
   * @return {boolean} Returns true if the object's energy is zero, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the endboss is dead by comparing the energy of the endboss to zero.
   * @return {boolean} Returns true if the energy of the endboss is zero, false otherwise.
   */
  isDeadEndboss() {
    return this.energyEndboss == 0;
  }

  /**
   * Plays an animation by updating the image of the object based on a given array of image paths.
   * @param {Array<string>} images - An array of image paths.
   * @return {void} This function does not return anything.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by adding the speed to the current x-coordinate.
   * @return {void} This function does not return anything.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by subtracting the speed from the current x-coordinate.
   * @return {void} This function does not return anything.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump action by setting the vertical speed and initial y-position of the object.
   * @return {void} This function does not return a value.
   */
  jump() {
    this.speedY = 30;
    this.initialY = 185;
  }
}
