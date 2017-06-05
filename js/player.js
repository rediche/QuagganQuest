class Player extends Container {
  constructor() {
    super();

    // Include the position mixin
    Object.assign(this, positionMixin);

    //console.log("Creating player...");

    this.makeBody('white');
  }

  makeBody(color) {
    let body = new createjs.Shape();
    body.graphics.beginFill(color);
    body.graphics.drawRect(0, 0, 32, 32);
    this.addChild(body);
  }
}