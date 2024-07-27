class ThrowableObject extends MovableObject {
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };
  isSplashing = false;
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

  throwLeftSide() {
    setInterval(() => {
      this.x -= 10;
    }, 25);
  }

  throwRightSide() {
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  animate() {
    setInterval(() => {
      if (this.throwing) {
        this.playAnimation(this.IMAGES_BOTTLEROTATION);
      }
    }, 1000 / 25);
  }

  splash() {
    this.isSplashing = true;
    this.playAnimation(this.IMAGES_BOTTLESPLASH);
    setTimeout(() => {
      this.isSplashing = false;
    }, 300); // Adjust the duration as needed
  }
}
