class Coin extends MovableObject {
  height = 130;
  width = 130;
  offset = {
    top: 43,
    right: 43,
    bottom: 43,
    left: 43,
  };

  IMAGES_COINS = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  /**
   * Initializes a new instance of the class.
   * This constructor calls the `loadImage` method of the parent class with the image path `'img/8_coin/coin_1.png'`.
   * It then calls the `loadImages` method with the `IMAGES_COINS` array.
   * After that, it calls the `randomPositioningCoins` method to generate a random position for the coins.
   * Finally, it calls the `animateCoins` method to start the coin animation.
   * @return {void} This constructor does not return a value.
   */
  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COINS);
    this.randomPositioningCoins();
    this.animateCoins();
  }

  /**
   * Generates a random position for the coins.
   * This function sets the `x` and `y` properties of the current object to random values between 500 and 2100 for the `x` coordinate and between 50 and 230 for the `y` coordinate.
   * @return {void} This function does not return a value.
   */
  randomPositioningCoins() {
    this.x = 500 + Math.random() * 1600;
    this.y = 50 + Math.random() * 180;
  }

  /**
   * Sets an interval to repeatedly play the coin animation using the images from `IMAGES_COINS` array.
   * @return {void} This function does not return a value.
   */
  animateCoins() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 500);
  }
}

class Bottle extends MovableObject {
  height = 90;
  width = 90;
  offset = {
    top: 15,
    right: 15,
    bottom: 5,
    left: 25,
  };

  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  /**
   * Initializes a new instance of the class.
   * This constructor calls the `loadImage` method of the parent class with the image path `'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'`.
   * It then calls the `loadImages` method with the `IMAGES_BOTTLES` array.
   * After that, it calls the `randomPositioningBottle` method to generate a random position for the bottle.
   * Finally, it calls the `animateBottle` method to start the bottle animation.
   * @return {void} This constructor does not return a value.
   */
  constructor() {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_BOTTLES);
    this.randomPositioningBottle();
    this.animateBottle();
  }

  /**
   * Sets random x and y positions for the bottle object.
   * @return {void} This function does not return a value.
   */
  randomPositioningBottle() {
    this.x = 500 + Math.random() * 1800;
    this.y = 60 + Math.random() * 180;
  }

  /**
   * Animate the bottle by playing the animation using the images from the `IMAGES_BOTTLES` array.
   * This function sets an interval to repeatedly play the animation every 500 milliseconds.
   * @return {void} This function does not return a value.
   */
  animateBottle() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 500);
  }
}
