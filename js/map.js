class Map extends Container {
  constructor( settings ) {
    super();

    // Add HitTest to this class
    Object.assign(this, hitTestMixin);

    // Load parameters into the class
    this.settings = settings;

    // Set initial state
    this.speed = 2;
    this.objects = [];

    //console.log("Constructing Map:", this.settings.name);

    // Draw Floor of map
    this.drawTiles(settings.floor);

    // Draw objects on map
    this.drawLayers(settings.objects);
  }

  drawTiles( layer, saveTiles = false ) {

    for (let row = 0; row < layer.size.rows; row++) {

      for (let col = 0; col < layer.size.cols; col++) {
        let newTile = this.makeTileFromType(layer.type);
        newTile.graphics.drawRect(0, 0, 32, 32);
        newTile.width = newTile.height = 32;
        newTile.setGridPosition(layer.grid.col + col, layer.grid.row + row);
        this.addChild(newTile);

        if (saveTiles === true) {
          this.objects.push(newTile);
        }
      }

    }

    //console.log(this.objects);

  }

  drawLayers( layers ) {
    layers.forEach(layer => {
      this.drawTiles(layer, true);
    });
  }

  makeTileFromType( type ) {
    let tile;
    switch ( type ) {
      case 'grass':
        tile = new Grass();
        break;
      case 'water':
        tile = new Water();
        break;
      case 'bush':
        tile = new Bush();
        break;
    }

    return tile;
  }

  move( direction ) {
    switch (direction) {
      case 'up':
        this.tryToMove(0, -this.speed);
        break;
      case 'down':
        this.tryToMove(0, this.speed);
        break;
      case 'left':
        this.tryToMove(-this.speed, 0);
        break;
      case 'right':
        this.tryToMove(this.speed, 0);
        break;
    }
  }

  tryToMove(diffX, diffY) {
    let canvas = game.stage.canvas;

    if (this.canMoveTo(diffX, diffY)) {
      let newX = this.x + diffX;
      let newY = this.y + diffY;

      this.setPosition(newX, newY);
    }
  }

  /**
   * Inspired by PETL
   * Src: https://github.com/petlatkea/petersplayground/blob/master/js/game.js
   * @param {Number} diffX 
   * @param {Number} diffY 
   */
  canMoveTo(diffX, diffY) {
    // Kør gennem alle this.objects
    // Hvis de vil ramme diffX/diffY, så tjek om den er walkable
    let validPosition = true;
    let player = game.player;

    // Somehow get object at x, y range and check against player position. 

    let left = Math.floor(player.x - 32 + diffX);
    let right = Math.floor(player.x + 32 + diffX);
    let top = Math.floor(player.y - 32 + diffY);
    let bottom = Math.floor(player.y + 32 + diffY);

    for (let x = left; x <= right; x++) {
      for (let y = top; y <= bottom; y++) {
        validPosition = validPosition && this.getObjectAt(x, y, diffX, diffY);
      }
    }

    return validPosition;
  }

  getObjectAt(x, y, diffX, diffY) {
    let map = game.map.obj;

    let match = this.objects.find(object => {
      return object.x + diffX + map.x === x && object.y + diffY + map.y === y;
    });

    if (match) {
      return match.canWalkOn();
    }

    return true;
  }
}