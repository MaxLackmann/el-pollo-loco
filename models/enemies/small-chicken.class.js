class SmallChicken extends MovableObject {
  height = 55;
  width = 55;
  y = 375;
  isDead = false;
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  /**
   * Constructs a new instance of the class with the given audio object.
   * @param {Object} audio - The audio object used for sound management.
   */
  constructor(audio) {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.soundmanager = audio;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.randomPositioning();
    this.randomSpeed();
    this.animate();
  }

  /**
   * Generates a random position for the object on the x-axis.
   * This function sets the `x` property of the object to a random value between 500 and 2300.
   * @return {void} This function does not return a value.
   */
  randomPositioning() {
    this.x = 500 + Math.random() * 1800;
  }

  /**
   * Generates a random speed for the object.
   * @return {void} This function does not return a value.
   */
  randomSpeed() {
    this.speed = 0.15 + Math.random() * 0.5;
  }

  /**
   * Starts the animation by calling the startMovement and startAnimation methods.
   * @return {void} This function does not return anything.
   */
  animate() {
    this.startMovement();
    this.startAnimation();
  }

  /**
   * Starts the movement of the object by continuously calling the moveLeft and playWalkingSound methods at a set interval.
   * @return {void} This function does not return a value.
   */
  startMovement() {
    setInterval(() => {
      this.moveLeft();
      this.playWalkingSound();
    }, 1000 / 60);
  }

  /**
   * Plays the walking sound if the sound manager is not muted.
   * @return {void} This function does not return a value.
   */
  playWalkingSound() {
    if (!this.soundmanager.isMuted) {
      this.soundmanager.chickenWalkingSound.play();
      this.soundmanager.chickenWalkingSound.volume = 0.1;
    }
  }

  /**
   * Starts the animation of the object.
   * @return {void} This function does not return a value.
   */
  startAnimation() {
    setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
