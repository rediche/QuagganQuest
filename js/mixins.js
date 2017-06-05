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
    this.setPosition(col * 32, row * 32);
  }
};