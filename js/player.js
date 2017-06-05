class Player extends createjs.Container {
  constructor() {
    super();

    this.makeBody('white');
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;

    return;
  }

  setGridPosition(col, row) {
    this.setPosition(col * 64, row * 64);
  }

  makeBody(color) {
    let body = new createjs.Shape();
    body.graphics.beginFill(color);
    body.graphics.drawRect(0, 0, 64, 64);
    this.addChild(body);
  }
}