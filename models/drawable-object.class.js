class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  visible = true;

  /**
   * Loads an image from a specified path and assigns it to the object's img property.
   * @param {string} path - The path to the image file.
   * @return {void} This function does not return a value.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @return {void} This function does not return a value.
   */
  draw(ctx) {
    if (this.visible) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * A description of the entire function.
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof SmallChicken ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      //ctx.lineWidth = '3';
      //ctx.strokeStyle = 'blue';
      //ctx.rect(
      //  this.x + this.offset.left,
      //  this.y + this.offset.top,
      //  this.width - this.offset.right - this.offset.left,
      //  this.height - this.offset.bottom - this.offset.top
      //);
      ctx.stroke();
    }
  }
}
