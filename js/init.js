function initialize() {
  //console.log("Starting Quaggan Quest...");

  // Set FPS to 60.
  createjs.Ticker.setFPS(60);

  /* Save to state */
  game.stage = new createjs.Stage('QuagganQuest');
  game.utility = new Utility();

  // Initialize queue and preloader
  game.queue = new createjs.LoadQueue(true);
  game.queue.loadManifest(MANIFEST);
  game.queue.on('progress', queueProgress);
  game.queue.on('complete', queueComplete);
}

function queueProgress(e) {
  //console.log("Queue Progress:", e.progress);
  game.stage.update(e);
}

function queueComplete(e) {
  //console.log("Queue Completed!");
  //console.log(game.queue.getResult('mapsJson')[0]);
  game.level = 0;

  startLevel(game.level);  

  /* Add tick listener */
  createjs.Ticker.addEventListener('tick', onTick);
}

function startLevel( level ) {
  initMap(game.queue.getResult('mapsJson')[level]);
  initPlayer();
}

function initPlayer() {
  game.player = new Player();
  game.player.setGridPosition(13, 9);
  game.stage.addChild(game.player);
}

function initMap( settings ) {
  game.map = new Map(settings);
  game.stage.addChild(game.map);
}

function onTick(e) {

  if (game.paused === true) {
    console.log("Game paused");
  } else {
    console.log("Game running");
  }

  game.stage.update(e);
}

window.addEventListener('load', initialize);