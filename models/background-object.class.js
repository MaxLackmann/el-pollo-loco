class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Initializes the object with the provided image path and x position.
   * @param {string} imagePath - The path to the image to load.
   * @param {number} x - The initial x position of the object.
   * @return {void} This function does not return a value.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
