/**
 * Position Mixin
 * Applied across multiple different types of subclasses
 * that all needs to be positioned either with x, y or in the grid.
 * Inspired from https://stackoverflow.com/a/42250080/7022831
 */
let positionMixin = {
  setPosition: function(x, y) {
    this.x = x;
    this.y = y;

    return;
  },

  setGridPosition: function(col, row) {
    this.gridCol = col;
    this.gridRow = row;
    this.setPosition(col * 32, row * 32);
  }
};

let hitTestMixin = {
  hitTest: function(objA, objB) {
    if ( objA.x >= objB.x + objB.width
      || objA.x + objA.width <= objB.x
      || objA.y >= objB.y + objB.height
      || objA.y + objA.height <= objB.y ) {
      return false;
    }
    return true;
  }
};