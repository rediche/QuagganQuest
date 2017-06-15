/**
 * Inspired by PETL
 * Src: https://github.com/petlatkea/petersplayground/blob/master/js/tiles.js
 */
class Tile extends createjs.Sprite {
  constructor( type ) {
    super(game.spritesheets.tiles);
    
    // Include position mixin
    Object.assign(this, positionMixin);

    this.walkable = true;
    this.type = type;
  }

  canWalkOn() {
    return this.walkable;
  }

  walkOn() {
    // Do something if something should happen
  }

  /**
   * Player is always in middle of screen. Check if this tile hits that spot.
   * @param {Number} offsetX 
   * @param {Number} offsetY 
   */
  touchesPlayer(offsetX = 0, offsetY = 0) {
    let canvas = game.stage.canvas;
    let map = game.map.obj;
    let player = game.player;

    // Map is important, because that adds the maps offset.
    // The map offset is needed, because the maps is a container of tiles,
    // so the tiles are relative position to the map and not global coordinates.
    // Simple Hit Detection. Overlap is not an issue.
    let xHits = (this.x + map.x + offsetX + this.width > player.x && this.x + map.x + offsetX < player.x + player.width);
    let yHits = (this.y + map.y + offsetY + this.height > player.y && this.y + map.y + offsetY < player.y + player.height);

    if (xHits && yHits) {
      return true;
    } else {
      return false;
    }
  }
}

class Grass extends Tile {
  constructor() {
    super('grass');

    this.gotoAndStop('grassMidMid');
    //this.graphics.beginFill('green');
  }
}

class Water extends Tile {
  constructor() {
    super('water');

    this.gotoAndStop('waterMidMid');
    //this.graphics.beginFill('blue');
    this.walkable = false;
  }
}

class Bush extends Tile {
  constructor() {
    super('bush');

    this.gotoAndStop('bushSpring');
    //this.graphics.beginFill('brown');

    if (game.utility.generateRandomNumber(1, 100) > 50) {
      this.hasEnemy = true;
    }
  }

  walkOn() {
    if (this.hasEnemy === true) {
      //console.log("oh shit! Enemy incoming!");
      game.fightInitiator = this;
      goIntoCombat();
    }
  }
}

class Boss extends Bush {
  constructor() {
    super('boss');

    this.gotoAndStop('bushSummer');
    this.hasEnemy = true;
  }
}