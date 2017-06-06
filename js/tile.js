/**
 * Inspired by PETL
 * Src: https://github.com/petlatkea/petersplayground/blob/master/js/tiles.js
 */
class Tile extends createjs.Shape {
  constructor( type ) {
    super();
    
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
}

class Grass extends Tile {
  constructor() {
    super('grass');

    this.graphics.beginFill('green');
  }
}

class Water extends Tile {
  constructor() {
    super('water');

    this.graphics.beginFill('blue');
    this.walkable = false;
  }
}

class Bush extends Tile {
  constructor() {
    super('bush');

    this.graphics.beginFill('brown');
  }
}