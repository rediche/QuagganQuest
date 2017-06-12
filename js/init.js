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
  game.spritesheets.dices.basic = new createjs.SpriteSheet(game.queue.getResult('diceSpriteSheetJson'));

  game.map.current = 0;

  startMap(game.map);  

  /* Add tick listener */
  createjs.Ticker.addEventListener('tick', onTick);

  /* Add keyboard listeners */
  window.addEventListener('keydown', keyPressed);
  window.addEventListener('keyup', keyReleased);
}

function keyPressed(e) {
  switch (e.key) {
    case 'ArrowUp':
      keys.up = true;
      e.preventDefault();
      break;
    case 'ArrowDown':
      keys.down = true;
      e.preventDefault();
      break;
    case 'ArrowLeft':
      keys.left = true;
      e.preventDefault();
      break;
    case 'ArrowRight':
      keys.right = true;
      e.preventDefault();
      break;
  }
}

function keyReleased(e) {
  switch (e.key) {
    case 'ArrowUp':
      keys.up = false;
      e.preventDefault();
      break;
    case 'ArrowDown':
      keys.down = false;
      e.preventDefault();
      break;
    case 'ArrowLeft':
      keys.left = false;
      e.preventDefault();
      break;
    case 'ArrowRight':
      keys.right = false;
      e.preventDefault();
      break;
  }
}

function moveMap( map ) {
  // Move opposite direction of what is pressed, because we're moving the map
  if (keys.left) {
    map.move('right');
  } else if (keys.right) {
    map.move('left');
  }

  if (keys.up) {
    map.move('down');
  } else if (keys.down) {
    map.move('up');
  }
}

function startMap( map ) {
  initMap(game.queue.getResult('mapsJson')[map.current]);
  initPlayer();
}

function initPlayer() {
  game.player = new Player();
  game.player.setGridPosition(6, 4);
  game.stage.addChild(game.player);
}

function initMap( settings ) {
  game.map.obj = new Map(settings);
  game.stage.addChild(game.map.obj);
}

function initArena() {
  let stage = game.stage;

  game.arena = new Arena();
  stage.addChild(game.arena);

  game.utility.putOnTopOfStage(game.player, game.stage);
}

function goIntoCombat() {
  console.log("going into combat");
  let canvas = game.stage.canvas;
  let player = game.player;
  let map = game.map.obj;
  let view = game.view;

  view.current = view.options.combat;

  map.alpha = 0;

  // Save player X,Y for when going back onto map
  player.mapX = player.x;
  player.mapY = player.y; 

  player.x = 32;
  player.y = canvas.height - 128;

  initArena();
}

function goOutOfCombat() {
  let stage = game.stage;
  let player = game.player;
  let view = game.view;
  let map = game.map.obj;

  // Reset arena
  stage.removeChild(game.arena);
  game.arena = null;

  // Put player back in original X,Y
  player.x = player.mapX;
  player.y = player.mapY;

  // Show map again
  view.current = view.options.map;
  map.alpha = 1;
}

function onTick(e) {

  if (game.paused === true) {
    console.log("Game paused");
  } else if (game.view.current === game.view.options.combat) {
    //console.log("in combat");
  } else {
    //console.log("Game running");
    moveMap( game.map.obj );
  }

  game.stage.update(e);
}

window.addEventListener('load', initialize);