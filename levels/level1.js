let level1;

/**
 * Initializes a new Level object with the specified enemies, clouds, background objects, coins, and bottles.
 * @return {void} This function does not return a value.
 */
function initLevel() {
  const numClouds = 6;
  const totalWidth = 2400;
  const segmentWidth = totalWidth / numClouds;
  level1 = new Level(
    [
      new Chicken(soundmanager),
      new Chicken(soundmanager),
      new Chicken(soundmanager),
      new SmallChicken(soundmanager),
      new SmallChicken(soundmanager),
      new SmallChicken(soundmanager),
      new SmallChicken(soundmanager),
      new SmallChicken(soundmanager),
    ],

    [new Endboss(soundmanager)],

    [
      new Cloud(0 * segmentWidth, 1 * segmentWidth),
      new Cloud(1 * segmentWidth, 2 * segmentWidth),
      new Cloud(2 * segmentWidth, 3 * segmentWidth),
      new Cloud(3 * segmentWidth, 4 * segmentWidth),
      new Cloud(4 * segmentWidth, 5 * segmentWidth),
      new Cloud(5 * segmentWidth, 6 * segmentWidth),
    ],
    [
      new BackgroundObject('img/5_background/layers/air.png', -719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        -719
      ),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/air.png', 719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/1.png',
        719 * 2
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/1.png',
        719 * 2
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/1.png',
        719 * 2
      ),
      new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719 * 3
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719 * 3
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719 * 3
      ),
      new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
      new BackgroundObject(
        'img/5_background/layers/3_third_layer/2.png',
        719 * 4
      ),
      new BackgroundObject(
        'img/5_background/layers/2_second_layer/2.png',
        719 * 4
      ),
      new BackgroundObject(
        'img/5_background/layers/1_first_layer/2.png',
        719 * 4
      ),
    ],
    [
      new Coin(soundmanager),
      new Coin(soundmanager),
      new Coin(soundmanager),
      new Coin(soundmanager),
      new Coin(soundmanager),
      new Coin(soundmanager),
      new Coin(soundmanager),
      new Coin(soundmanager),
      new Coin(soundmanager),
      new Coin(soundmanager),
    ],

    [
      new Bottle(soundmanager),
      new Bottle(soundmanager),
      new Bottle(soundmanager),
      new Bottle(soundmanager),
      new Bottle(soundmanager),
      new Bottle(soundmanager),
      new Bottle(soundmanager),
      new Bottle(soundmanager),
      new Bottle(soundmanager),
      new Bottle(soundmanager),
    ]
  );
}
