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

  /**
   * Initializes a new instance of the Statusbar class.
   * This constructor initializes the properties of the Statusbar object,
   * including loading images, setting the position and size, and setting the
   * initial percentage value.
   * @return {void} This constructor does not return a value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_LIFESTATUSBAR);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage value and updates the image path accordingly.
   * @param {number} percentage - The percentage value to set.
   * @return {void} This function does not return a value.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_LIFESTATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the percentage value.
   * @return {number} The resolved image index.
   */
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

  /**
   * Constructor for the StatusbarCoin class.
   * @param {void} This function does not take any parameters.
   * @return {void} This function does not return a value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGE_STATUSBARCOIN);
    this.x = 40;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setCoinPercentage(0);
  }

  /**
   * Sets the coin percentage and updates the image path based on the resolved image index for the coins.
   * @param {number} coinpercentage - The new coin percentage value to set.
   * @return {void} This function does not return a value.
   */
  setCoinPercentage(coinpercentage) {
    this.coinpercentage = coinpercentage;
    let path = this.IMAGE_STATUSBARCOIN[this.resolveImageIndexCoins()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index for the coins based on the current coin percentage.
   * @return {number} The resolved image index for the coins.
   */
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

  /**
   * Initializes a new instance of the StatusbarBottle class.
   * @return {void} This function does not return a value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBARBOTTLE);
    this.x = 40;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setBottlePercentage(0);
  }

  /**
   * Sets the bottle percentage and updates the image cache with the corresponding image path.
   * @param {number} bottlepercentage - The new bottle percentage value.
   * @return {void} This function does not return a value.
   */
  setBottlePercentage(bottlepercentage) {
    this.bottlepercentage = bottlepercentage;
    let path = this.IMAGES_STATUSBARBOTTLE[this.resolveImageIndexBottles()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the bottle percentage.
   * @return {number} The index of the image in the image array.
   */
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

  /**
   * Initializes a new instance of the class.
   * This constructor initializes the properties of the class and loads the images for the endboss lifestatusbar.
   * It sets the x and y coordinates to 500 and 0 respectively, and sets the width and height to 200 and 60 respectively.
   * Finally, it sets the endboss percentage to 100.
   * @constructor
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOSSLIFESTATUSBAR);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setEndbossPercentage(100);
  }

  /**
   * Sets the endboss percentage and updates the image accordingly.
   * @param {number} endbossPercentage - The percentage of the endboss.
   * @return {void} This function does not return anything.
   */
  setEndbossPercentage(endbossPercentage) {
    this.endbossPercentage = endbossPercentage;
    let path = this.IMAGES_BOSSLIFESTATUSBAR[this.resolveImageIndexEndboss()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the endboss percentage.
   * @return {number} The index of the image in the image array.
   */
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

  /**
   * Sets the visibility of the object to true.
   * @return {void} This function does not return anything.
   */
  show() {
    this.visible = true;
  }
}
