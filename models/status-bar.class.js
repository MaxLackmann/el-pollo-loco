class Statusbar extends DrawableObject {
  IMAGES_LIFESTATUSBAR = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
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
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
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
    if (this.coinpercentage <= 0) {
      return 0;
    } else if (this.coinpercentage <= 20) {
      return 1;
    } else if (this.coinpercentage <= 40) {
      return 2;
    } else if (this.coinpercentage <= 60) {
      return 3;
    } else if (this.coinpercentage <= 90) {
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
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  bottlepercentage = 0;
  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBARBOTTLE);
    this.x = 40;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setBottlePercentage(0);
  }

  setBottlePercentage(bottlepercentage) {
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

class StatusbarEndboss extends DrawableObject {
  IMAGES_BOSSLIFESTATUSBAR = [
    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
  ];

  endbossPercentage = 100;
  visible = false;
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOSSLIFESTATUSBAR);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setEndbossPercentage(100);
  }

  setEndbossPercentage(endbossPercentage) {
    this.endbossPercentage = endbossPercentage;
    let path = this.IMAGES_BOSSLIFESTATUSBAR[this.resolveImageIndexEndboss()];
    this.img = this.imageCache[path];
  }

  resolveImageIndexEndboss() {
    if (this.endbossPercentage == 100) {
      return 5;
    } else if (this.endbossPercentage > 80) {
      return 4;
    } else if (this.endbossPercentage > 60) {
      return 3;
    } else if (this.endbossPercentage > 40) {
      return 2;
    } else if (this.endbossPercentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }

  show() {
    this.visible = true;
  }
}
