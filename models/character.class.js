class Character extends MovableObject {
  height = 250;
  width = 150;
  y = 185;
  speed = 10;
  offset = {
    top: 95,
    bottom: 10,
    left: 20,
    right: 30,
  };
  lastMoveTime = Date.now();
  isSleeping = false;

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_SLEEPING = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  world;

  /**
   * Initializes a new instance of the class.
   * @param {Object} audio - The audio object.
   * @return {void}
   */
  constructor(audio) {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.soundmanager = audio;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEPING);
    this.applyGravity();
    this.animate();
  }

  /**
   * Animates the object by starting the movement and animation.
   * @return {void} This function does not return a value.
   */
  animate() {
    this.startMovement();
    this.startAnimation();
  }

  /**
   * Starts the movement of the object.
   * @return {void}
   */
  startMovement() {
    setInterval(() => {
      let moved = this.handleMovement();
      if (moved) {
        this.lastMoveTime = Date.now(); // Update the last move time
        this.isSleeping = false;
      }
      this.handleWalkingSound(moved);
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Handles the movement of the object based on the current keyboard input.
   * @return {boolean} Returns true if the object has moved, false otherwise.
   */
  handleMovement() {
    let moved = false;
    if (
      (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
      (this.world.keyboard.D && this.x < this.world.level.level_end_x)
    ) {
      this.moveRight();
      this.otherDirection = false;
      moved = true;
    }
    if (
      (this.world.keyboard.LEFT && this.x > 0) ||
      (this.world.keyboard.A && this.x > 0)
    ) {
      this.moveLeft();
      this.otherDirection = true;
      moved = true;
    }
    if (
      (this.world.keyboard.SPACE && !this.isAboveGround()) ||
      (this.world.keyboard.UP && !this.isAboveGround()) ||
      (this.world.keyboard.W && !this.isAboveGround())
    ) {
      super.jump();
      this.playJumpingSound();
      moved = true;
    }
    return moved;
  }

  /**
   * Plays the jumping sound if the sound manager is not muted.
   * @return {void} This function does not return anything.
   */
  playJumpingSound() {
    if (!this.soundmanager.isMuted) {
      this.soundmanager.jumpingSound.play();
    }
  }

  /**
   * Handles the walking sound based on whether the character has moved and is above ground.
   * @param {boolean} moved - Indicates whether the character has moved.
   * @return {void} This function does not return a value.
   */
  handleWalkingSound(moved) {
    if (moved && !this.isAboveGround()) {
      if (!this.soundmanager.isMuted) {
        this.soundmanager.walkingSound.play();
      }
    } else {
      if (!this.soundmanager.isMuted) {
        this.soundmanager.walkingSound.pause();
      }
    }
  }

  /**
   * Starts an animation by calling the `updateAnimation` method every 100 milliseconds.
   * @return {void} This function does not return a value.
   */
  startAnimation() {
    setInterval(() => {
      this.updateAnimation();
    }, 1000 / 10);
  }

  /**
   * Updates the animation based on the character's state.
   * This function checks the character's state and plays the appropriate animation.
   * If the character is dead, it plays the DEAD animation and pauses the sleeping sound.
   * If the character is hurt, it plays the HURT animation and pauses the sleeping sound.
   * If the character is above ground, it plays the JUMPING animation and pauses the sleeping sound.
   * If the character has been inactive for more than 3 seconds, it plays the SLEEPING animation and starts the sleeping sound if it hasn't started already.
   * If none of the above conditions are met, it plays the default animation based on keyboard input.
   * @return {void} This function does not return a value.
   */
  updateAnimation() {
    const currentTime = Date.now();
    const timeSinceLastMove = currentTime - this.lastMoveTime;
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.pauseSleepingSound();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.pauseSleepingSound();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      this.pauseSleepingSound();
    } else if (timeSinceLastMove > 3000) {
      if (!this.isSleeping) {
        this.playSleepingSound();
        this.isSleeping = true;
      }
      this.playAnimation(this.IMAGES_SLEEPING);
    } else {
      this.playDefaultAnimation();
    }
  }

  /**
   * Pauses the sleeping sound if the sound manager is not muted.
   * @return {void} This function does not return a value.
   */
  pauseSleepingSound() {
    if (!this.soundmanager.isMuted) {
      this.soundmanager.sleepingSound.pause();
    }
  }

  /**
   * Plays the sleeping sound if the sound manager is not muted.
   * @return {void} This function does not return a value.
   */
  playSleepingSound() {
    if (!this.soundmanager.isMuted) {
      this.soundmanager.sleepingSound.play();
    }
  }

  /**
   * Plays the default animation based on keyboard input.
   */
  playDefaultAnimation() {
    if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }
}
