class Statusbar extends DrawableObject {
  IMAGES_LIFESTATUSBAR = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
  ];

  percentage = 100;
  constructor() {
    super();
    this.loadImages(this.IMAGES_LIFESTATUSBAR);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_LIFESTATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}

class StatusbarCoin extends DrawableObject {
  IMAGE_STATUSBARCOIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
  ];

  coinpercentage = 0;
  constructor() {
    super();
    this.loadImages(this.IMAGE_STATUSBARCOIN);
    this.x = 40;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setCoinPercentage(0);
  }

  setCoinPercentage(coinpercentage) {
    this.coinpercentage = coinpercentage;
    let path = this.IMAGE_STATUSBARCOIN[this.resolveImageIndexCoins()];
    this.img = this.imageCache[path];
  }

  resolveImageIndexCoins() {
    if (this.coinpercentage == 0) {
      return 0;
    } else if (this.coinpercentage <= 20) {
      return 1;
    } else if (this.coinpercentage <= 40) {
      return 2;
    } else if (this.coinpercentage <= 60) {
      return 3;
    } else if (this.coinpercentage <= 80) {
      return 4;
    } else {
      return 5;
    }
  }
}

class StatusbarBottle extends DrawableObject {
  IMAGES_STATUSBARBOTTLE = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
  ];

  bottlepercentage = 0;
  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBARBOTTLE);
    this.x = 40;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setBottlPercentage(0);
  }

  setBottlPercentage(bottlepercentage) {
    this.bottlepercentage = bottlepercentage;
    let path = this.IMAGES_STATUSBARBOTTLE[this.resolveImageIndexBottles()];
    this.img = this.imageCache[path];
  }

  resolveImageIndexBottles() {
    if (this.bottlepercentage == 0) {
      return 0;
    } else if (this.bottlepercentage <= 20) {
      return 1;
    } else if (this.bottlepercentage <= 40) {
      return 2;
    } else if (this.bottlepercentage <= 60) {
      return 3;
    } else if (this.bottlepercentage <= 80) {
      return 4;
    } else {
      return 5;
    }
  }
}
