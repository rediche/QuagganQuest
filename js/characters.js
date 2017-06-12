class Character extends Container {
  constructor(config = {}) {
    super();

    //console.log('Making character');

    this.hp = 20;
    this.width = 32;
    this.height = 32;
    this.accumulatedDmg = 0;
    this.dices = [
      new Dice(1, 6),
      new Dice(1, 6)
    ];

    if (config.color) {
      this.makeBody(config.color);
    } else {
      this.makeBody('white');
    }
  }

  makeBody(color) {
    let body = new createjs.Shape();
    body.graphics.beginFill(color);
    body.graphics.drawRect(0, 0, 32, 32);
    this.addChild(body);
  }

  setAccumulatedDmg(addToDmg) {
    this.accumulatedDmg = this.accumulatedDmg + addToDmg;
    console.log("New accumulated dmg", this.accumulatedDmg);
  }

  resetAccumulatedDmg() {
    this.accumulatedDmg = 0;
  }
}

class Player extends Character {
  constructor() {
    super();
  }
}

class Enemy extends Character {
  constructor() {
    super({color: 'blue'});
  }
}