class Map extends Container {
  constructor( settings ) {
    super();

    // Include the position mixin
    Object.assign(this, positionMixin);

    this.settings = settings;
    console.log("Constructing Map:", this.settings.name);

    console.log(this.settings.layers[0]);
    this.drawLayers(this.settings.layers);
    //this.makeBaseTile('green');
  }

  drawLayers( layers ) {
    layers.forEach(layer => {
      this.drawLayer(layer);
    });
  }

  drawLayer( layer ) {
    let that = this;
    layer.forEach(section => {
      for(let col = 0; col < section.size.cols; col++) {
        for(let row = 0; row < section.size.rows; row++) {
          let newTile = that.determineTileType(section.type);
          newTile.graphics.drawRect(0, 0, 32, 32);
          newTile.setGridPosition(section.grid.col + col, section.grid.row + row);
          that.addChild(newTile);
        }
      }
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
    }

    return tile;
  }
}