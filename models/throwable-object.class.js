class ThrowableObject extends MovableObject {
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };
  isSplashing = false;
  splashFinished = false;

  /**
   * Initializes a new instance of the class.
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   * @param {string} direction - The direction of the object.
   * @return {void} This function does not return a value.
   */
  constructor(x, y, direction) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_BOTTLEROTATION);
    this.loadImages(this.IMAGES_BOTTLESPLASH);
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 50;
    this.otherDirection = direction;
    this.throw();
    this.throwing = this.throw;
    this.animate();
  }

  IMAGES_BOTTLEROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];
  IMAGES_BOTTLESPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  /**
   * Throws the object by setting the initial speed in the Y-axis, applying gravity,
   * and updating the position based on the direction.
   * @return {void} This function does not return a value.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    if (this.otherDirection == true) {
      this.x -= 100;
      this.throwLeftSide();
    } else {
      this.throwRightSide();
    }
  }

  /**
   * Moves the object to the left by decreasing its x-coordinate by 10 pixels every 25 milliseconds.
   * @return {void} This function does not return a value.
   */
  throwLeftSide() {
    setInterval(() => {
      this.x -= 10;
    }, 25);
  }

  /**
   * Moves the object to the right by increasing its x-coordinate by 10 pixels every 25 milliseconds.
   * @return {void} This function does not return a value.
   */
  throwRightSide() {
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  /**
   * Animate the object by playing the animation if it is currently being thrown and not currently splashing.
   * This function runs continuously using setInterval, checking every 1000/25 milliseconds.
   * @return {void} This function does not return a value.
   */
  animate() {
    setInterval(() => {
      if (this.throwing && !this.isSplashing) {
        this.playAnimation(this.IMAGES_BOTTLEROTATION);
      }
    }, 1000 / 25);
  }

  /**
   * Sets the isSplashing property to true and plays the animation for the bottle splash.
   * After 300 milliseconds, sets the splashFinished property to true.
   * @return {void} This function does not return a value.
   */
  splash() {
    this.isSplashing = true;
    this.playAnimation(this.IMAGES_BOTTLESPLASH);
    setTimeout(() => {
      this.splashFinished = true;
    }, 300);
  }

  /**
   * Removes the current instance of the bottle from the list of throwable objects in the world.
   * @return {void} This function does not return a value.
   */
  removeBottle() {
    const index = world.throwableObjects.indexOf(this);
    if (index > -1) {
      world.throwableObjects.splice(index, 1);
    }
  }
}
