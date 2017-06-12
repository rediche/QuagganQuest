const MANIFEST = [{
  "id": "mapsJson",
  "src": "data/maps.json"
},{
  "id": "diceSpriteSheetJson",
  "src": "data/diceSpriteSheet.json"
},{
  "id": "grassyAreaImg",
  "src": "img/backgrounds/grassy-area.png"
}];

let game = {
  stage: null,
  view: {
    current: 'map',
    options: {
      map: 'map',
      combat: 'combat'
    }
  },
  spritesheets: {
    dices: {
      basic: null
    }
  },
  queue: null,
  utility: null,
  player: null,
  map: {
    obj: null,
    current: null
  },
  arena: null,
  paused: false
};

let keys = {
  up: false,
  down: false,
  left: false,
  right: false
}