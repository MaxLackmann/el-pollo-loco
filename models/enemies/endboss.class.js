class Endboss extends MovableObject {
  height = 400;
  width = 300;
  y = 55;
  speed = 1;
  isDead = false;
  isAngry = false;
  isAttacking = false;
  statusbarEndboss = false;
  alertAnimationDone = false;
  isInView = false;
  offset = {
    top: 70,
    bottom: 20,
    left: 20,
    right: 10,
  };

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  /**
   * Sets the `isInView` property to `true` to indicate that the enemy is moving.
   * @return {void} This function does not return a value.
   */
  startMoving() {
    this.isInView = true;
  }

  /**
   * Initializes a new instance of the EndBoss class.
   * @param {Audio} audio - The audio object used for playing sounds.
   * @return {void} This constructor does not return a value.
   */
  constructor(audio) {
    super(audio);
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.animate();
  }

  /**
   * Updates the direction of the character based on its position relative to this object.
   * @param {Object} character - The character object to update the direction for.
   * @return {void} This function does not return anything.
   */
  updateDirection(character) {
    if (character.x < this.x) {
      this.otherDirection = false;
    } else {
      this.otherDirection = true;
    }
  }

  /**
   * Moves the boss left or right based on the `otherDirection` property.
   * @return {void} This function does not return a value.
   */
  moveBoss() {
    if (!this.otherDirection) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }
  }

  /**
   * Starts the animation and movement of the object.
   * @return {void} This function does not return a value.
   */
  animate() {
    this.startMovement();
    this.startAnimation();
  }

  /**
   * Starts the movement of the boss by repeatedly checking the current state of the object and moving the boss if certain conditions are met.
   * @return {void} This function does not return a value.
   */
  startMovement() {
    setInterval(() => {
      if (
        this.isInView &&
        !this.isDeadEndboss() &&
        !this.isHurt() &&
        (this.alertAnimationDone || (!this.isAngry && !this.isAttacking))
      ) {
        this.moveBoss();
      }
    }, 1000 / 60);
  }

  /**
   * Starts the animation by repeatedly calling the `updateAnimation` method every 100 milliseconds.
   * @return {void} This function does not return a value.
   */
  startAnimation() {
    setInterval(() => {
      this.updateAnimation();
    }, 100);
  }

  /**
   * Updates the animation based on the current state of the object.
   * @return {void} This function does not return a value.
   */
  updateAnimation() {
    if (this.isDeadEndboss()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt() && !this.isAngry) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAngry && !this.alertAnimationDone) {
      this.playAlertAnimation();
    } else if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Plays the alert animation and increases the speed of the endboss enemy.
   * The alert animation consists of a sequence of images displayed at a rate of 10 frames per second.
   * The animation is played until all images have been displayed, at which point the speed of the endboss enemy is increased.
   * The endboss enemy becomes immune to damage during the animation.
   * @return {void} This function does not return a value.
   */
  playAlertAnimation() {
    let i = 0;
    const alertInterval = setInterval(() => {
      if (i < this.IMAGES_ALERT.length) {
        this.playAnimation(this.IMAGES_ALERT);
        this.setImmunity(true);
        i++;
      } else {
        clearInterval(alertInterval);
        this.alertAnimationDone = true;
        this.increaseSpeed();
        this.setImmunity(false);
      }
    }, 100);
  }

  /**
   * Sets the immunity state of the object.
   * @param {boolean} state - The new immunity state.
   * @return {void} This function does not return a value.
   */
  setImmunity(state) {
    this.immune = state;
    if (state) {
      setTimeout(() => {
        this.immune = false;
      }, 1000);
    }
  }

  /**
   * Increases the speed of the object by multiplying it with 1.25.
   * @return {void} This function does not return a value.
   */
  increaseSpeed() {
    this.speed *= 1.25;
  }
}
