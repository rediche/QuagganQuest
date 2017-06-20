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

    if (config.sprite) {
      this.body = this.makeBody(config.sprite);
    } else {
      this.body = this.makeBody();
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

  makeBody(sprite = 'charCaveMan') {
    let body = new createjs.Sprite(game.spritesheets.enemies, sprite);
    //body.graphics.beginFill(color);
    //body.graphics.drawRect(0, 0, 32, 32);
    this.addChild(body);
    return body;
  }

  setHP(newHP) {
    this.hp = newHP;
    this.updateHPText();
  }

  setAccumulatedDmg(newAccumulatedDmg) {
    let dmgDiff = newAccumulatedDmg - this.accumulatedDmg;
    this.accumulatedDmg = newAccumulatedDmg;
    //console.log("New accumulated dmg", this.accumulatedDmg);

    // Run accumulated dmg animation
    if (newAccumulatedDmg !== 0) {
      this.accumulatedDmgAnimation(dmgDiff);
    }
  }

  accumulatedDmgAnimation(dmgDiff) {
    let text = new createjs.Text(
      '+' + dmgDiff,
      "10px 'Press Start 2P'",
      'black'
    );

    text.textAlign = 'center';
    text.x = this.x + 15;
    text.y = this.y;

    game.stage.addChild(text);

    createjs.Tween.get(text)
      .to({
        y: text.y - 50,
        alpha: 0
      }, 1300, createjs.Ease.quartOut)
      .call(function() {
        game.stage.removeChild(text);
    });
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

  makeBody(spritesheet) {
    let body = new createjs.Sprite(game.spritesheets.quaggan.world, 'moving');
    //body.graphics.beginFill(color);
    //body.graphics.drawRect(0, 0, 32, 32);
    body.regX = 16;
    body.regY = 16;
    this.addChild(body);
    return body;
  }

  arenaLook() {
    let arenaLook = new createjs.Sprite(game.spritesheets.quaggan.attack, "combatStance");
    arenaLook.alpha = 0;

    this.addChild(arenaLook);

    return arenaLook
  }

  setAccumulatedDmg(newAccumulatedDmg) {
    super.setAccumulatedDmg(newAccumulatedDmg);
    game.arena.ui.updateAccumulatedDamageText(newAccumulatedDmg);
  }

}

/**
 * Example of having an upper dmg limit on enemy.
 */
class Enemy extends Character {
  constructor(settings = {hp: 20}) {
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
    super({hp: 30, sprite: 'charGuard'});

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