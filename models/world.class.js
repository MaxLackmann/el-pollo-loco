class World {
  character = new Character();
  level = level1;
  canvas;
  ctx; // ctx = context
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  statusBarCoin = new StatusbarCoin();
  statusBarBottle = new StatusbarBottle();
  statusBarEndboss = new StatusbarEndboss();
  throwableObjects = [];
  collectedCoins = [];
  collectedBottles = [];
  maxBottles = 5;
  endBossActivated = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      setInterval(() => {
        this.checkCollisions();
        this.checkCollisionsThrowableObjectsEnemies();
      }, 10);

      this.checkThrowObjects();
      this.checkCollisionsCoins();
      this.checkCollisionsBottles();

      this.checkCollisionsThrowableObjectsEndBoss();
      this.checkEndbossInRange();
      this.updateEndbossDirection();
      this.checkCollisionsWithEndboss();
    }, 200);
  }

  updateEndbossDirection() {
    this.level.endboss.forEach((endboss) => {
      endboss.updateDirection(this.character);
    });
  }

  checkEndbossInRange() {
    if (!this.endbossActivated) {
      this.level.endboss.forEach((endboss) => {
        if (
          this.character.x + this.canvas.width > endboss.x &&
          this.character.x < endboss.x + endboss.width
        ) {
          this.statusBarEndboss.show();
          endboss.startMoving();
          this.endbossActivated = true;
        }
      });
    }
  }

  checkCollisionsThrowableObjectsEndBoss() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.endboss.forEach((endboss) => {
        if (throwableObject.isColliding(endboss)) {
          this.throwableObjects.splice(
            this.throwableObjects.indexOf(throwableObject),
            1
          );
          endboss.hitEndboss();
          this.statusBarEndboss.setEndbossPercentage(endboss.energyEndboss);
        }
      });
    });
  }

  checkCollisionsThrowableObjectsEnemies() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          this.throwableObjects.splice(
            this.throwableObjects.indexOf(throwableObject),
            1
          );
          enemy.isDead = true;
          setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
          }, 100);
        }
      });
    });
  }

  checkThrowObjects() {
    if (this.keyboard.F || this.keyboard.SHIFT) {
      if (this.collectedBottles.length > 0) {
        let bottle = new ThrowableObject(
          this.character.x + 100,
          this.character.y + 100,
          this.character.otherDirection
        );
        this.throwableObjects.push(bottle);
        this.collectedBottles.pop();
        this.character.decreaseEnergyBottle();
        this.statusBarBottle.setBottlePercentage(this.character.energyBottle);
        this.character.lastMoveTime = Date.now();
      }
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.speedY < 0 && this.character.isAboveGround()) {
          this.character.speedY = 20; // Bounce back
          enemy.isDead = true;
          this.character.immune = true;
          setTimeout(() => {
            this.character.immune = false;
          }, 500);
          setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
          }, 300);
        } else if (!this.character.immune) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkCollisionsWithEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        if (!endboss.isAttacking) {
          endboss.isAttacking = true;
          endboss.playAnimation(endboss.IMAGES_ATTACK);
          this.character.bigHit();
          this.statusBar.setPercentage(this.character.energy);
          setTimeout(() => {
            endboss.isAttacking = false;
          }, 600);
        }
      }
    });
  }

  checkCollisionsCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
        this.character.increaseEnergyCoin();
        this.statusBarCoin.setCoinPercentage(this.character.energyCoin);
      }
    });
  }

  checkCollisionsBottles() {
    if (!this.collectedBottles) {
      this.collectedBottles = [];
    }
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (this.collectedBottles.length < this.maxBottles) {
          this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
          this.collectedBottles.push(bottle);
          this.character.increaseEnergyBottle();
          this.statusBarBottle.setBottlePercentage(this.character.energyBottle);
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    // ------ space for fixed objects ------
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);

    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    // mo = movable object
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
