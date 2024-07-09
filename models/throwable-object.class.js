class ThrowableObject extends MovableObject {
  constructor(x, y, direction) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 50;
    this.otherDirection = direction;
    this.throw();
    this.throwing = this.throw;
    this.animate();
  }

  IMAGES_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
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
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 1000 / 25);
  }
}
