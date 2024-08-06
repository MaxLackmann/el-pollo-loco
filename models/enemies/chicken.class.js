class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 360;
  isDead = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  //chickenWalkingSound = new Audio('audio/chicken_walking.mp3');

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor(audio) {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.audio = audio;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.randomPositioning();
    this.randomSpeed();
    this.animate();
  }

  randomPositioning() {
    this.x = 500 + Math.random() * 1800;
  }

  randomSpeed() {
    this.speed = 0.15 + Math.random() * 0.5;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      //this.chickenWalkingSound.play();
      //this.chickenWalkingSound.volume = 0.1;
      this.audio.chickenWalkingSound.play();
      this.audio.chickenWalkingSound.volume = 0.1;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead === false) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      if (this.isDead === true) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100);
  }
}
