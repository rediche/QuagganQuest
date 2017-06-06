class Map extends Container {
  constructor( settings ) {
    super();

    // Include the position mixin
    Object.assign(this, positionMixin);

    // Load parameters into the class
    this.settings = settings;

    // Set initial state
    this.speed = 2;

    console.log("Constructing Map:", this.settings.name);

    // Draw Floor of map
    this.drawTiles(settings.floor);

    // Draw solid layers
    this.drawLayers(settings.solids);

    // Draw non solid layers
    this.drawLayers(settings.nonSolids);

    //console.log(this.settings.layers[0]);
    //this.drawLayers(this.settings.layers);
    //this.makeBaseTile('green');
  }

  drawTiles( layer ) {
    let that = this;
    for(let col = 0; col < layer.size.cols; col++) {
      for(let row = 0; row < layer.size.rows; row++) {
        let newTile = that.determineTileType(layer.type);
        newTile.graphics.drawRect(0, 0, 32, 32);
        newTile.setGridPosition(layer.grid.col + col, layer.grid.row + row);
        that.addChild(newTile);
      }
    }
  }

  drawLayers( layers ) {
    layers.forEach(layer => {
      this.drawTiles(layer);
    });
  }

  determineTileType( type ) {
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
        this.y = this.y - this.speed;
        break;
      case 'down':
        this.y = this.y + this.speed;
        break;
      case 'left':
        this.x = this.x - this.speed;
        break;
      case 'right':
        this.x = this.x + this.speed;
        break;
    }
  }
}