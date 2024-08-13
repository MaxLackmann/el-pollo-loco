class Level {
  enemies;
  endboss;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_end_x = 2400;

  /**
   * Constructs a new Level object with the specified enemies, endboss, clouds, backgroundObjects, coins, and bottles.
   * @param {Array} enemies - An array of enemy objects.
   * @param {Object} endboss - The endboss object.
   * @param {Array} clouds - An array of cloud objects.
   * @param {Array} backgroundObjects - An array of background object objects.
   * @param {Array} coins - An array of coin objects.
   * @param {Array} bottles - An array of bottle objects.
   */
  constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}
