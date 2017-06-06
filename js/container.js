class Container extends createjs.Container {
  constructor() {
    super();

    // Include position mixin
    Object.assign(this, positionMixin);
  }
}