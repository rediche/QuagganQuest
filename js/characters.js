class Character extends Container {
  constructor(config = {}) {
    super();

    //console.log('Making character');

    this.hp = config.hp || 20;
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

  setHP(newHP) {
    this.hp = newHP;
  }

  setAccumulatedDmg(newAccumulatedDmg) {
    this.accumulatedDmg = newAccumulatedDmg;
    //console.log("New accumulated dmg", this.accumulatedDmg);
  }

  resetDices() {
    this.dices.forEach(dice => {
      dice.thrown = false;
    });
  }
}

class Player extends Character {
  constructor() {
    super();
  }
}

class Enemy extends Character {
  constructor() {
    super({color: 'blue', hp: 20});
  }
}