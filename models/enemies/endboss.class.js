class Endboss extends MovableObject {
  height = 400;
  width = 300;
  y = 55;
  speed = 0.2;
  isDead = false;
  isAngry = false;
  isAttacking = false;
  statusbarEndboss = false;
  alertAnimationDone = false;
  isInView = false;
  offset = {
    top: 60,
    bottom: 15,
    left: 10,
    right: 5,
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

  startMoving() {
    this.isInView = true;
  }

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2400;
    this.animate();
  }

  updateDirection(character) {
    if (character.x < this.x) {
      this.otherDirection = false;
    } else {
      this.otherDirection = true;
    }
  }

  moveLeftBoss() {
    if (!this.otherDirection) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }
  }

  animate() {
    setInterval(() => {
      if (
        this.isInView &&
        !this.isDeadEndboss() &&
        !this.isHurt() &&
        (this.alertAnimationDone || (!this.isAngry && !this.isAttacking))
      ) {
        this.moveLeftBoss();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDeadEndboss()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAngry && !this.alertAnimationDone) {
        this.playAlertAnimation();
      } else if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  playAlertAnimation() {
    let i = 0;
    const alertInterval = setInterval(() => {
      if (i < this.IMAGES_ALERT.length) {
        this.playAnimation(this.IMAGES_ALERT);
        i++;
        this.immune = true;
        setTimeout(() => {
          this.immune = false;
        }, 1000);
      } else {
        clearInterval(alertInterval);
        this.alertAnimationDone = true;
        this.increaseSpeed();
      }
    }, 100);
  }

  increaseSpeed() {
    this.speed *= 1.35; // Increase speed by 50%
  }
}
