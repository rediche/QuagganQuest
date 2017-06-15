function initialize() {
  //console.log("Starting Quaggan Quest...");

  // Set FPS to 60.
  createjs.Ticker.setFPS(60);

  /* Save to state */
  game.stage = new createjs.Stage('QuagganQuest');
  game.utility = new Utility();

  // Add preload UI
  game.preloadUI = new PreloadUI();
  game.stage.addChild(game.preloadUI);

  // Initialize queue and preloader
  game.queue = new createjs.LoadQueue(true);
  game.queue.installPlugin(createjs.Sound); // Make sounds work
  game.queue.loadManifest(MANIFEST);
  game.queue.on('progress', queueProgress);
  game.queue.on('complete', queueComplete);
}

function queueProgress(e) {
  game.preloadUI.loadingBar.progress.graphics.command.w = e.progress * 200;
  game.stage.update(e);
}

function queueComplete(e) {
  //console.log("Queue Completed!");

  //console.log(game.queue.getResult('mapsJson')[0]);
  game.spritesheets.tiles = new createjs.SpriteSheet(game.queue.getResult('tileSpriteSheetJson'));
  game.spritesheets.dices.basic = new createjs.SpriteSheet(game.queue.getResult('diceSpriteSheetJson'));
  game.spritesheets.quaggan = new createjs.SpriteSheet(game.queue.getResult('quagganSpriteSheetJson'));

  game.map.current = 0;

  startMap(game.map);  

  // Remove reloadUI
  game.stage.removeChild(game.preloadUI);
  game.preloadUI = null; // Clean up after myself

  /* Add tick listener */
  createjs.Ticker.addEventListener('tick', onTick);

  /* Add keyboard listeners */
  window.addEventListener('keydown', keyPressed);
  window.addEventListener('keyup', keyReleased);

  /* Add sound listener */
  document.querySelector('#mute').addEventListener('click', muteSounds);

  /* Add how to play listener */
  document.querySelector('#howtoplay').addEventListener('click', howtoplayToggle);
}

/**
 * Src: https://github.com/CreateJS/SoundJS/blob/master/examples/TestSuite.html
 * @param {Event} e 
 */
function muteSounds(e) {
  var muted = !createjs.Sound.muted;
  createjs.Sound.muted = muted;
} 

function howtoplayToggle(e) {
  document.querySelector('.howtoplay').classList.toggle('show');
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
  game.map.obj.startBackgroundMusic();
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

  // Hide player body and show players arena look
  player.body.alpha = 0;
  player.arenaLook.alpha = 1;

  // Save player X,Y for when going back onto map
  player.mapX = player.x;
  player.mapY = player.y; 

  player.x = 32;
  player.y = canvas.height - 96;

  initArena();

  // Add HP Text to player
  player.makeHPText('left');

  game.utility.putOnTopOfStage(game.arena.enemy.hpText, game.stage);
}

function goOutOfCombat() {
  let stage = game.stage;
  let player = game.player;
  let view = game.view;
  let map = game.map.obj;

  // HP Texts
  stage.removeChild(player.hpText);
  stage.removeChild(game.arena.enemy.hpText);

  // Reset arena
  stage.removeChild(game.arena);
  game.arena = null;

  // Hide player arena look and show players body
  player.body.alpha = 1;
  player.arenaLook.alpha = 0;

  // Put player back in original X,Y
  player.x = player.mapX;
  player.y = player.mapY;

  // Rest player HP
  player.hp = 20;

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