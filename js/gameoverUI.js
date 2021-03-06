class GameOverUI extends Container {
  constructor() {
    super();

    this.text = this.createText();
    this.respawnBtn = this.respawnBtn();
    // TODO: NICE Animate in
  }

  createText() {
    let text = new createjs.Text(
      'You died.',
      "20px 'Press Start 2P'",
      'white'
    );

    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.x = game.stage.canvas.width / 2;
    text.y = game.stage.canvas.height / 2 - 25;

    this.addChild(text);
    return text;
  }

  respawnBtn() {
    let canvas = game.stage.canvas;
    let respawnBtn = new RespawnButton();

    respawnBtn.x = canvas.width / 2 - respawnBtn.width / 2;
    respawnBtn.y = canvas.height / 2 - respawnBtn.height / 2 + 25;

    this.addChild(respawnBtn);
    return respawnBtn;
  }
}

class RespawnButton extends Button {
    constructor() {
        super('Respawn');
    }

    onClick(e) {
        game.map.obj.x = 0;
        game.map.obj.y = 0;
        goOutOfCombat();
        game.stage.removeChild(e.target.parent.parent);
    }
}