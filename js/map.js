class Map extends Container {
  constructor( settings ) {
    super();

    // Include the position mixin
    Object.assign(this, positionMixin);

    this.settings = settings;
    console.log("Constructing Map:", this.settings.name);

    // Draw Base Layer
    this.drawTiles(settings.baseLayer);

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
    switch( type ) {
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
}