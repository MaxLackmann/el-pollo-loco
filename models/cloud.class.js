class Cloud extends MovableObject {
  height = 300;
  width = 500;

  /**
   * Initializes a new instance of the Cloud class.
   * @param {number} minX - The minimum x-coordinate of the cloud.
   * @param {number} maxX - The maximum x-coordinate of the cloud.
   * @return {void} This function does not return a value.
   */
  constructor(minX, maxX) {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * (maxX - minX) + minX;
    this.y = Math.random() * 20;
    this.animate();
  }

  /**
   * Animates the object by moving it to the left at a rate of 60 frames per second.
   * @return {void} This function does not return a value.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
