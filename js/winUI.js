class WinUI extends Container {
  constructor() {
    super();

    this.text = this.createText();
    this.continueJourneyBtn = this.continueJourneyBtn();
    // TODO: Animate in
  }

  createText() {
    let text = new createjs.Text(
      'You won.',
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

  continueJourneyBtn() {
    let canvas = game.stage.canvas;
    let respawnBtn = new ContinueJourneyBtn();

    respawnBtn.x = canvas.width / 2 - respawnBtn.width / 2;
    respawnBtn.y = canvas.height / 2 - respawnBtn.height / 2 + 25;

    this.addChild(respawnBtn);
    return respawnBtn;
  }
}

class ContinueJourneyBtn extends Button {
    constructor() {
        super('Continue');
    }

    onClick(e) {
        goOutOfCombat();
        game.stage.removeChild(e.target.parent.parent);
    }
}