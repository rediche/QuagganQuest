class Player extends Container {
  constructor() {
    super();

    this.makeBody('white');
  }

  makeBody(color) {
    let body = new createjs.Shape();
    body.graphics.beginFill(color);
    body.graphics.drawRect(0, 0, 64, 64);
    this.addChild(body);
  }
}