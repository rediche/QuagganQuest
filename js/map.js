class Map extends Container {
  constructor() {
    super();
    console.log("Constructing Map...");

    this.makeBaseTile('green');
  }

  makeBaseTile(color) {
    let baseTile = new createjs.Shape();

    baseTile.graphics.beginFill(color);
    baseTile.graphics.drawRect(0, 0, 64, 64);

    

    this.addChild(baseTile);
  }
}