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
    this.backgroundMusicSong = 'openWorldMusic';

    this.width = settings.floor.size.cols * 32;
    this.height = settings.floor.size.rows * 32;

    //console.log("Constructing Map:", this.settings.name);

    // Draw Floor of map
    this.drawTiles(settings.floor);

    // Draw objects on map
    this.drawLayers(settings.objects);

    //this.setPosition(settings.floor.offset.x, settings.floor.offset.y); // Position map
  }

  startBackgroundMusic() {
    this.backgroundMusic = createjs.Sound.play(this.backgroundMusicSong);
    this.backgroundMusic.setVolume(0.2);

    // Loop the song
    this.backgroundMusic.on('complete', function(e) {
      e.target.play();
    });
  }

  drawTiles( layer, saveTiles = false ) {

    for (let row = 0; row < layer.size.rows; row++) {

      for (let col = 0; col < layer.size.cols; col++) {
        let newTile = this.makeTileFromType(layer.type);
        //newTile.graphics.drawRect(0, 0, 32, 32);
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
      case 'boss':
        tile = new BossTile();
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

    this.turn(direction); // Turn in the direction player is trying to move.
  }

  turn( direction ) {
    switch (direction) {
      case 'up':
        game.player.body.rotation = 180;
        break;
      case 'down':
        game.player.body.rotation = 0;
        break;
      case 'left':
        game.player.body.rotation = 90;
        break;
      case 'right':
        game.player.body.rotation = -90;
        break;
    }
  }

  tryToMove(diffX, diffY) {
    let canvas = game.stage.canvas;

    if (!this.hitMapBounds(diffX, diffY)) {
      if (this.canMoveTo(diffX, diffY)) {
        let newX = this.x + diffX;
        let newY = this.y + diffY;

        this.setPosition(newX, newY);

        let match = this.findObjectTouchingPlayer();

        if (match) {
          match.walkOn();
        }
      }
    }
  }

  hitMapBounds(diffX, diffY) {
    let player = game.player;
    if (this.x + diffX > player.x - player.width / 2 || this.x + this.width + diffX < player.x + player.width / 2) {
      return true;
    } 

    if (this.y + diffY > player.y - player.height / 2 || this.y + this.height + diffY < player.y + player.height / 2) {
      return true;
    }

    return false;
  }

  /**
   * Inspired by PETL
   * Src: https://github.com/petlatkea/petersplayground/blob/master/js/game.js
   * @param {Number} diffX 
   * @param {Number} diffY 
   */
  canMoveTo(diffX, diffY) {
    let player = game.player;

    let match = this.findObjectTouchingPlayer(diffX, diffY);

    if (match) {
      return match.canWalkOn();
    }

    return true;
  }

  findObjectTouchingPlayer(offsetX = 0, offsetY = 0) {
    return this.objects.find(object => {
      return object.touchesPlayer(offsetX, offsetY) === true;
    });
  }
}