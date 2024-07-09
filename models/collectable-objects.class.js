class Coin extends MovableObject {
  height = 90;
  width = 90;
  offset = {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  };

  IMAGES_COINS = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];
  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COINS);
    this.randomPositioningCoins();
    this.animateCoins();
  }

  randomPositioningCoins() {
    this.x = 500 + Math.random() * 1800;
    this.y = 50 + Math.random() * 200;
  }

  animateCoins() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 1000 / 60);
  }
}

class Bottle extends MovableObject {
  height = 90;
  width = 90;
  offset = {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  };

  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];
  constructor() {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_BOTTLES);
    this.randomPositioningBottle();
    this.animateBottle();
  }

  randomPositioningBottle() {
    this.x = 500 + Math.random() * 1800;
    this.y = 50 + Math.random() * 200;
  }

  animateBottle() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 1000 / 60);
  }
}
