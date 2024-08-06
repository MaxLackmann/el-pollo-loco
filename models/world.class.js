class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  audio;
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
  lastThrowTime = 0;
  //hitBottleSound = new Audio('audio/bottle_hit.mp3');
  //bossSound = new Audio('audio/boss.mp3');
  //throwBottleSound = new Audio('audio/throw.mp3');
  //coinSound = new Audio('audio/picked_coin.mp3');
  //bottleSound = new Audio('audio/picked_bottle.mp3');
  //winSound = new Audio('audio/win.mp3');
  //winSound2 = new Audio('audio/win2.mp3');
  //loseSound = new Audio('audio/lose.mp3');
  //enemiesDeadSound = new Audio('audio/enemies_dead.mp3');

  constructor(canvas, keyboard, audio) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.audio = audio;
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
      this.checkGameOver();
    }, 200);
  }

  checkGameOver() {
    if (this.character.energy <= 0) {
      this.loseGame();
    }

    this.level.endboss.forEach((endboss) => {
      if (endboss.energyEndboss <= 0) {
        this.winGame();
      }
    });
  }

  loseGame() {
    setTimeout(() => {
      loseGame();
      //this.loseSound.play();
      //this.character.sleepingSound.pause();
      this.audio.loseSound.play();
      this.audio.character.sleepingSound.pause();
    }, 700);
  }

  winGame() {
    setTimeout(() => {
      winGame();
      //this.winSound.play();
      //this.winSound2.play();
      //this.character.sleepingSound.pause();
      this.audio.winSound.play();
      this.audio.winSound2.play();
      this.audio.character.sleepingSound.pause();
    }, 700);
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
          //this.bossSound.play();
          this.audio.bossSound.play();
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
          //this.hitBottleSound.pause(); // Stop the sound if it's already
          //this.hitBottleSound.currentTime = 0; // Reset the sound to the beginning
          //this.hitBottleSound.play(); // Play the sound
          this.audio.hitBottleSound.pause(); // Stop the sound if it's already
          this.audio.hitBottleSound.currentTime = 0; // Reset the sound to the beginning
          this.audio.hitBottleSound.play(); // Play the sound
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
          //this.hitBottleSound.pause(); // Stop the sound if it's already
          //this.hitBottleSound.currentTime = 0; // Reset the sound to the beginning
          //this.hitBottleSound.play(); // Play the sound
          this.audio.hitBottleSound.pause(); // Stop the sound if it's already
          this.audio.hitBottleSound.currentTime = 0; // Reset the sound to the beginning
          this.audio.hitBottleSound.play(); // Play the sound
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
    const now = Date.now();
    if (
      (this.keyboard.F || this.keyboard.SHIFT) &&
      now - this.lastThrowTime > 500
    ) {
      if (this.collectedBottles.length > 0) {
        let bottle = new ThrowableObject(
          this.character.x + 100,
          this.character.y + 100,
          this.character.otherDirection
        );
        //this.throwBottleSound.play();
        this.audio.throwBottleSound.play();
        this.throwableObjects.push(bottle);
        this.collectedBottles.pop();
        this.character.decreaseEnergyBottle();
        this.statusBarBottle.setBottlePercentage(this.character.energyBottle);
        this.character.lastMoveTime = Date.now();
        this.lastThrowTime = now;
      }
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.speedY < 0 && this.character.isAboveGround()) {
          //this.enemiesDeadSound.pause(); // Stop the sound if it's already
          //this.enemiesDeadSound.currentTime = 0; // Reset the sound to the beginning
          //this.enemiesDeadSound.play(); // Play the sound
          this.audio.enemiesDeadSound.pause(); // Stop the sound if it's already
          this.audio.enemiesDeadSound.currentTime = 0; // Reset the sound to the beginning
          this.audio.enemiesDeadSound.play(); // Play the sound
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
        //this.coinSound.play();
        this.audio.coinSound.play();
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
          //this.bottleSound.play();
          this.audio.bottleSound.play();
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
