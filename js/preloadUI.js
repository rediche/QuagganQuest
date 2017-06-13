class PreloadUI extends Container {
  constructor() {
    super();

    this.loadingText = this.loadingText();
    this.loadingBar = this.loadingBar();
  }

  loadingText() {
    let text = new createjs.Text(
      'Loading...',
      "14px 'Press Start 2P'",
      'white'
    );

    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.x = game.stage.canvas.width / 2;
    text.y = game.stage.canvas.height / 2 - 20;

    this.addChild(text);

    return text;
  }

  loadingBar() {
    let loadingBar = new LoadingBar();
    this.addChild(loadingBar);
    return loadingBar;
  }
}

class LoadingBar extends Container {
  constructor() {
    super();

    this.border = this.createBorder();
    this.progress = this.createProgressBar();
  }

  createBorder() {
    let canvas = game.stage.canvas;
    let border = new createjs.Shape();

    border.graphics.beginFill('white');
    border.graphics.drawRect(0, 0, 208, 16);

    border.x = canvas.width / 2 - 104;
    border.y = canvas.height / 2 + 18;

    this.addChild(border);
    
    return border;
  }

  createProgressBar() {
    let canvas = game.stage.canvas;
    let progressBar = new createjs.Shape();

    progressBar.graphics.beginFill('black');
    progressBar.graphics.drawRect(0, 0, 10, 12);

    progressBar.x = canvas.width / 2 - 100;
    progressBar.y = canvas.height / 2 + 20;

    this.addChild(progressBar);

    return progressBar;
  }

}