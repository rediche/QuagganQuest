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
    this.attackSoundVolume = 1;

    if (config.color) {
      this.body = this.makeBody(config.color);
    } else {
      this.body = this.makeBody('white');
    }

    // TODO: Add HP event listener to Update HP Text
  }

  makeHPText(position) {
    let canvas = game.stage.canvas;

    let text = new createjs.Text(
      'HP: ' + this.hp,
      "12px 'Press Start 2P'",
      'black'
    );

    switch (position) {
      case 'right':
        text.x = canvas.width - 8;
        text.textAlign = 'right';
        break;
      case 'left':
      default:
        text.x = 8;
        break;
    }

    text.y = 8;

    this.hpText = text;
    game.stage.addChild(this.hpText);
  }

  updateHPText() {
    this.hpText.text = 'HP: ' + this.hp;
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
    this.updateHPText();
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
    attackSound.setVolume(this.attackSoundVolume);
    attackSound.play();
  }
}

class Player extends Character {
  constructor() {
    super();

    this.attackSound = 'quagganCooSound';
    this.attackSoundVolume = 1;
    this.arenaLook = this.arenaLook();
  }

  arenaLook() {
    let arenaLook = new createjs.Sprite(game.spritesheets.quaggan, "combatStance");
    arenaLook.alpha = 0;

    this.addChild(arenaLook);

    return arenaLook
  }

  setAccumulatedDmg(newAccumulatedDmg) {
    this.accumulatedDmg = newAccumulatedDmg;
    game.arena.ui.updateAccumulatedDamageText(newAccumulatedDmg);
    //console.log("New accumulated dmg", this.accumulatedDmg);
  }

}

/**
 * Example of having an upper dmg limit on enemy.
 */
class Enemy extends Character {
  constructor(settings = {color: 'blue', hp: 20}) {
    super(settings);

    this.dmgLimit = 5;
    this.attackSoundVolume = 0.2;
  }

  wantsToThrowDice() {
    if (this.accumulatedDmg < this.dmgLimit) {
      return true;
    }

    return false;
  }
}

/**
 * Example of having a roll limit on enemy.
 */
class Boss extends Character {
  constructor() {
    super({color: 'royalblue', hp: 30});

    this.throws = 0;
    this.throwsLimit = 3;
  }

  wantsToThrowDice() {
    if (this.throws < this.throwsLimit) {
      this.throws = this.throws + 1;
      return true;
    } else {
      return false;
    }
  }
}