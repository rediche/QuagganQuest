class Container extends createjs.Container {
  constructor() {
    super();
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;

    return;
  }

  setGridPosition(col, row) {
    this.setPosition(col * 64, row * 64);
  }
}