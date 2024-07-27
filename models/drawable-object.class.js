class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  visible = true;

  // loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    if (this.visible) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

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
      ctx.lineWidth = '3';
      ctx.strokeStyle = 'blue';
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right - this.offset.left,
        this.height - this.offset.bottom - this.offset.top
      );
      ctx.stroke();
    }
  }
}

// 1. Methode
/* Alternative (quick and dirty), um alle Intervalle zu beenden. */
//clearAllIntervals() {
//  for (let i = 1; i < 9999; i++) window.clearInterval(i);
//}

// 2. Methode
//let intervallIds = [];
//let i = 1;
//function setStoppableInterval(fn, time) {
//  let id = setInterval(fn, time);
//  intervallIds.push(id);
//}
//
//setStoppableInterval(sayHello, 500);
//setStoppableInterval(sayGoodbye, 500);
//
//function stopGame() {
//  intervallIds.forEach(clearInterval);
//}
//
//function sayHello() {
//  console.log('Hello', i);
//  i++;
//}
//
//function sayGoodbye() {
//  console.log('Goodbye', i);
//  i++;
//}
