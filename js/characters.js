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
    this.attackSound = 'banditAttackSound';

    if (config.color) {
      this.body = this.makeBody(config.color);
    } else {
      this.body = this.makeBody('white');
    }
  }

  makeBody(color) {
    let body = new createjs.Shape();
    body.graphics.beginFill(color);
    body.graphics.drawRect(0, 0, 32, 32);
    this.addChild(body);
    return body;
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

  playAttackSound() {
    // Inherited in subclasses
    let attackSound = createjs.Sound.play(this.attackSound);
    attackSound.setVolume(1);
    attackSound.play();
  }
}

class Player extends Character {
  constructor() {
    super();

    this.attackSound = 'quagganCooSound';
    this.arenaLook = this.arenaLook();
  }

  arenaLook() {
    let arenaLook = new createjs.Sprite(game.spritesheets.quaggan, "combatStance");
    arenaLook.alpha = 0;

    this.addChild(arenaLook);

    return arenaLook
  }

}

class Enemy extends Character {
  constructor() {
    super({color: 'blue', hp: 20});

    this.dmgLimit = 5;
  }

  wantsToThrowDice() {
    if (this.accumulatedDmg < this.dmgLimit) {
      return true;
    }

    return false;
  }
}