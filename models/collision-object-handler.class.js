class collisionHandler {
  /**
   * Constructs a new CollisionObjectHandler object with the provided world.
   * @param {Object} world - The world object containing the game state.
   */
  constructor(world) {
    this.world = world;
    this.lastThrowTime = 0;
  }
  /**
   * Checks for collisions between throwable objects and enemies in the level.
   * @return {void}
   */
  checkCollisionsThrowableObjectsEnemies() {
    this.world.throwableObjects.forEach((throwableObject) => {
      if (!throwableObject.isSplashing) {
        this.world.level.enemies.forEach((enemy) => {
          if (throwableObject.isColliding(enemy)) {
            this.handleCollision(throwableObject, enemy);
          }
        });
      }
    });
  }

  /**
   * Handles the collision between a throwable object and an enemy.
   * @param {Object} throwableObject - The throwable object that collided with the enemy.
   * @param {Object} enemy - The enemy object that was collided with.
   * @return {void}
   */
  handleCollision(throwableObject, enemy) {
    this.world.playSound(this.world.soundmanager.hitBottleSound);
    this.enemyCollision(throwableObject, enemy);
  }

  /**
   * Handles the collision between a throwable object and an enemy.
   * @param {Object} throwableObject - The throwable object that collided with the enemy.
   * @param {Object} enemy - The enemy object that was collided with.
   * @return {void}
   */
  enemyCollision(throwableObject, enemy) {
    throwableObject.splash();
    setTimeout(() => {
      this.removeEnemyAndBottle(enemy, throwableObject);
    }, 1000 / 25); // Ensure this time matches the splash duration
  }

  /**
   * Removes the enemy and bottle from the level.
   * @param {Object} enemy - The enemy object to remove.
   * @param {Object} throwableObject - The throwable object to remove the bottle from.
   * @return {void}
   */
  removeEnemyAndBottle(enemy, throwableObject) {
    enemy.isDead = true;
    const index = this.world.level.enemies.indexOf(enemy);
    if (index > -1) {
      this.world.level.enemies.splice(index, 1);
    }
    throwableObject.removeBottle();
  }

  /**
   * Checks for collisions between throwable objects and endbosses.
   * @return {void} This function does not return a value.
   */
  checkCollisionsThrowableObjectsEndBoss() {
    this.world.throwableObjects.forEach((throwableObject) => {
      if (!throwableObject.isSplashing) {
        this.checkCollisionWithEndboss(throwableObject);
      }
    });
  }

  /**
   * Checks if the given throwable object is colliding with any endboss in the level.
   * @param {Object} throwableObject - The throwable object to check for collisions.
   * @return {void}
   */
  checkCollisionWithEndboss(throwableObject) {
    this.world.level.endboss.forEach((endboss) => {
      if (throwableObject.isColliding(endboss)) {
        this.handleCollisionWithEndboss(throwableObject, endboss);
      }
    });
  }

  /**
   * Handles the collision between a throwable object and an endboss.
   * @param {Object} throwableObject - The throwable object involved in the collision.
   * @param {Object} endboss - The endboss involved in the collision.
   * @return {void}
   */
  handleCollisionWithEndboss(throwableObject, endboss) {
    this.world.playSound(this.world.soundmanager.hitBottleSound);
    throwableObject.splash();
    setTimeout(() => {
      endboss.hitEndboss();
      this.world.statusBarEndboss.setEndbossPercentage(endboss.energyEndboss);
      throwableObject.removeBottle();
    }, 1000 / 25);
  }

  /**
   * Checks if it is possible to throw an object and handles the throwing if it is.
   * @return {void}
   */
  checkThrowObjects() {
    const now = Date.now();
    if (this.canThrowObject(now)) {
      this.handleThrowObject();
    }
  }
  canThrowObject(now) {
    return (
      (this.world.keyboard.F || this.world.keyboard.SHIFT) &&
      now - this.lastThrowTime > 500 &&
      this.world.collectedBottles.length > 0
    );
  }

  /**
   * Handles the throwing of a throwable object.
   * @return {void}
   */
  handleThrowObject() {
    const bottle = this.createThrowableObject();
    this.world.playSound(this.world.soundmanager.throwBottleSound);
    this.world.throwableObjects.push(bottle);
    this.world.collectedBottles.pop();
    this.world.character.decreaseEnergyBottle();
    this.updateStatusBar();
    this.world.character.lastMoveTime = Date.now();
    this.lastThrowTime = Date.now();
  }

  /**
   * Creates a new ThrowableObject with the specified parameters.
   * @return {ThrowableObject} The newly created ThrowableObject.
   */
  createThrowableObject() {
    return new ThrowableObject(
      this.world.character.x + 100,
      this.world.character.y + 100,
      this.world.character.otherDirection
    );
  }

  /**
   * Updates the status bar with the current energy bottle percentage of the character.
   * @return {void}
   */
  updateStatusBar() {
    this.world.statusBarBottle.setBottlePercentage(
      this.world.character.energyBottle
    );
  }

  /**
   * Checks for collisions between the character and enemies in the level.
   * @return {void}
   */
  checkCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.isColliding(enemy)) {
        if (
          this.world.character.isAboveGround() &&
          this.world.character.speedY < 0
        ) {
          this.handleEnemyCollisionJumpHit(enemy);
        } else if (!this.world.character.immune) {
          this.handleCharacterHit();
        }
      }
    });
  }

  /**
   * Handles the collision between the character and an enemy when the character is jumping.
   * @param {Object} enemy - The enemy object that collided with the character.
   * @return {void}
   */
  handleEnemyCollisionJumpHit(enemy) {
    this.world.playSound(this.world.soundmanager.enemiesDeadSound);
    this.world.character.speedY = 20;
    enemy.isDead = true;
    this.world.character.immune = true;
    setTimeout(() => {
      this.world.character.immune = false;
    }, 500);
    setTimeout(() => {
      const index = this.world.level.enemies.indexOf(enemy);
      if (index > -1) {
        this.world.level.enemies.splice(index, 1);
      }
    }, 300);
  }

  /**
   * Handles the character hit.
   * @return {void}
   */
  handleCharacterHit() {
    this.world.character.hit();
    this.world.statusBar.setPercentage(this.world.character.energy);
  }

  /**
   * Checks for collisions between the character and each endboss in the level.
   * @return {void}
   */
  checkCollisionsWithEndboss() {
    this.world.level.endboss.forEach((endboss) => {
      if (this.world.character.isColliding(endboss)) {
        this.handleEndbossCollision(endboss);
      }
    });
  }

  /**
   * Handles the collision between the character and the end boss.
   * @param {Object} endboss - The end boss object.
   * @return {void}
   */
  handleEndbossCollision(endboss) {
    if (!endboss.isAttacking) {
      this.activateEndbossAttack(endboss);
      this.world.character.bigHit();
      this.world.statusBar.setPercentage(this.world.character.energy);
      this.resetEndbossAttack(endboss);
    }
  }

  /**
   * Activates the endboss attack.
   * @param {Object} endboss - The endboss object.
   * @return {void}
   */
  activateEndbossAttack(endboss) {
    endboss.isAttacking = true;
    endboss.playAnimation(endboss.IMAGES_ATTACK);
  }

  /**
   * Resets the attack status of the endboss after a delay of 600 milliseconds.
   * @param {Object} endboss - The endboss object.
   * @return {void}
   */
  resetEndbossAttack(endboss) {
    setTimeout(() => {
      endboss.isAttacking = false;
    }, 600);
  }

  /**
   * Checks for collisions between the character and the coins in the level.
   * @return {void}
   */
  checkCollisionsCoins() {
    this.world.level.coins.forEach((coin) => {
      if (this.world.character.isColliding(coin)) {
        this.handleCoinCollision(coin);
      }
    });
  }

  /**
   * Handles the collision between the character and a coin.
   * @param {Object} coin - The coin object.
   * @return {void}
   */
  handleCoinCollision(coin) {
    this.world.playSound(this.world.soundmanager.coinSound);
    this.removeCoin(coin);
    this.world.character.increaseEnergyCoin();
    this.updateCoinStatusBar();
  }

  /**
   * Removes a coin from the level.
   * @param {Object} coin - The coin object to be removed.
   * @return {undefined} This function does not return a value.
   */
  removeCoin(coin) {
    const index = this.world.level.coins.indexOf(coin);
    if (index > -1) {
      this.world.level.coins.splice(index, 1); // Remove the coin from the level
    }
  }

  /**
   * Updates the coin percentage in the status bar.
   * @return {void} This function does not return a value.
   */
  updateCoinStatusBar() {
    this.world.statusBarCoin.setCoinPercentage(this.world.character.energyCoin);
  }

  /**
   * Checks collisions with bottles in the level, handles collisions by calling handleBottleCollision.
   * @return {void} This function does not return a value.
   */
  checkCollisionsBottles() {
    if (!this.world.collectedBottles) {
      this.world.collectedBottles = [];
    }
    this.world.level.bottles.forEach((bottle) => {
      if (this.world.character.isColliding(bottle)) {
        this.handleBottleCollision(bottle);
      }
    });
  }

  /**
   * Handles the collision with a bottle, including playing the bottle sound, updating collected bottles, increasing character energy, and updating the bottle status bar.
   * @param {Object} bottle - The bottle object involved in the collision.
   * @return {void} This function does not return a value.
   */
  handleBottleCollision(bottle) {
    if (this.world.collectedBottles.length < this.world.maxBottles) {
      this.world.playSound(this.world.soundmanager.bottleSound);
      this.removeBottle(bottle);
      this.world.collectedBottles.push(bottle);
      this.world.character.increaseEnergyBottle();
      this.updateBottleStatusBar();
    }
  }

  /**
   * Removes a bottle from the level.
   * @param {Object} bottle - The bottle object to be removed.
   * @return {void} This function does not return a value.
   */
  removeBottle(bottle) {
    const index = this.world.level.bottles.indexOf(bottle);
    if (index > -1) {
      this.world.level.bottles.splice(index, 1); // Remove the bottle from the level
    }
  }

  /**
   * Updates the bottle status bar with the current energy bottle percentage of the character.
   * @return {void} This function does not return anything.
   */
  updateBottleStatusBar() {
    this.world.statusBarBottle.setBottlePercentage(
      this.world.character.energyBottle
    );
  }
}
