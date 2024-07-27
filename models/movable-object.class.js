class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  energyEndboss = 100;
  energyCoin = 0;
  energyBottle = 0;
  lastHit = 0;
  immune = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    if (!this.immune) {
      this.immune = true;
      this.energy -= 5;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
        this.lastMoveTime = Date.now();
      }
      setTimeout(() => {
        this.immune = false;
      }, 1500);
    }
  }

  bigHit() {
    if (!this.immune) {
      this.immune = true;
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
        this.lastMoveTime = Date.now();
      }
      setTimeout(() => {
        this.immune = false;
      }, 1500);
    }
  }

  checkEndbossEnergy() {
    if (this.energyEndboss <= 20 && !this.isAngry) {
      this.isAngry = true;
    }
  }

  hitEndboss() {
    if (!this.immune) {
      this.energyEndboss -= 21;
      if (this.energyEndboss < 0) {
        this.energyEndboss = 0;
      } else {
        this.lastHit = new Date().getTime();
        this.immune = true;
        setTimeout(() => {
          this.immune = false;
        }, 200);
      }
      this.checkEndbossEnergy();
    }
  }

  increaseEnergyCoin() {
    this.energyCoin += 10;
    if (this.energyCoin > 100) {
      this.energyCoin = 100;
    }
  }

  increaseEnergyBottle() {
    this.energyBottle += 20;
    if (this.energyBottle > 100) {
      this.energyBottle = 100;
    }
  }

  decreaseEnergyBottle() {
    this.energyBottle -= 20;
    if (this.energyBottle < 0) {
      this.energyBottle = 0;
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // differnce in milliseconds
    timepassed = timepassed / 1000; // in seconds
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  isDeadEndboss() {
    return this.energyEndboss == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
