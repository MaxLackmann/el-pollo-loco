class Character extends MovableObject {
  height = 250;
  width = 150;
  y = 180;
  speed = 10;
  offset = {
    top: 95,
    bottom: 10,
    left: 20,
    right: 20,
  };

  //walkingSound = new Audio('audio/character_walking.mp3');
  //sleepingSound = new Audio('audio/character_sleeping.mp3');
  //jumpingSound = new Audio('audio/character_jumping.mp3');
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

  constructor(audio) {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.audio = audio;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEPING);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
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
        //this.jumpingSound.play();
        this.audio.jumpingSound.play();
        moved = true;
      }

      if (moved) {
        this.lastMoveTime = Date.now(); // Update the last move time
        this.isSleeping = false;
      }

      if (moved && !this.isAboveGround()) {
        //this.walkingSound.play();
        this.audio.walkingSound.play();
      } else {
        //this.walkingSound.pause();
        this.audio.walkingSound.pause();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastMove = currentTime - this.lastMoveTime;

      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        //this.sleepingSound.pause();
        this.audio.sleepingSound.pause();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        //this.sleepingSound.pause();
        this.audio.sleepingSound.pause();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
        //this.sleepingSound.pause();
        this.audio.sleepingSound.pause();
      } else if (timeSinceLastMove > 3000) {
        if (!this.isSleeping) {
          //this.sleepingSound.play();
          this.audio.sleepingSound.play();
          this.isSleeping = true;
        }
        this.playAnimation(this.IMAGES_SLEEPING);
      } else {
        if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
          this.playAnimation(this.IMAGES_WALKING);
        } else {
          this.playAnimation(this.IMAGES_IDLE);
        }
      }
    }, 1000 / 10);
  }
}
