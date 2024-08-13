class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 360;
  isDead = false;
  offset = {
    top: 0,
    bottom: 5,
    left: 0,
    right: 0,
  };

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  /**
   * Constructor function for initializing a Chicken object.
   * @param {audio} audio - The audio manager for the Chicken object.
   * @return {void} This function does not return a value.
   */
  constructor(soundmanager) {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.soundmanager = soundmanager;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.randomPositioning();
    this.randomSpeed();
    this.animate();
  }

  /**
   * Randomly positions the object along the x-axis.
   * @return {void}
   */
  randomPositioning() {
    this.x = 500 + Math.random() * 1800;
  }

  /**
   * Randomly sets the speed of the object within a range from 0.15 to 0.65.
   * @return {void} This function does not return a value.
   */
  randomSpeed() {
    this.speed = 0.15 + Math.random() * 0.5;
  }

  /**
   * Animates the object by starting the movement and walking animations.
   * @return {void} This function does not return anything.
   */
  animate() {
    this.startMovementAnimation();
    this.startWalkingAnimation();
  }

  /**
   * Starts the movement animation by moving the object to the left and playing the walking sound.
   * @return {void} This function does not return a value.
   */
  startMovementAnimation() {
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
   * Starts the walking animation by repeatedly playing the appropriate animation
   * based on the object's state. The animation is played at a rate of 100ms.
   * @return {void} This function does not return a value.
   */
  startWalkingAnimation() {
    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100);
  }
}
