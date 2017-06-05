class Utility {
  constructor() {
    //console.log("Utility constructed!");
  }

  /**
   * Generate a random number between from and to.
   * 
   * @param {Number} from 
   * @param {Number} to 
   */
  generateRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  /**
   * Put a DisplayObject on top of stage
   * 
   * @param {DisplayObject} displayObject 
   */
  putOnTopOfStage(displayObject, container) {
    if (container.children.indexOf(displayObject) !== -1) {
      container.setChildIndex(displayObject, container.numChildren - 1);
    }
  }
}