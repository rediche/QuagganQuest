const MANIFEST = [{
  "id": "mapsJson",
  "src": "data/maps.json"
},{
  "id": "tileSpriteSheetJson",
  "src": "data/tileSpritesheet.json"
},{
  "id": "diceSpriteSheetJson",
  "src": "data/diceSpriteSheet.json"
},{
  "id": "quagganSpriteSheetJson",
  "src": "data/quagganSpriteSheet.json"
},{
  "id": "quagganTopSpriteSheetJson",
  "src": "data/quagganTopSpriteSheet.json"
},{
  "id": "grassyAreaImg",
  "src": "img/backgrounds/grassy-area.png"
},{
  "id": "quagganAttackSound",
  "src": "sounds/quaggan-attack.mp3"
},{
  "id": "quagganCooSound",
  "src": "sounds/quaggan-coo.mp3"
},{
  "id": "banditAttackSound",
  "src": "sounds/bandit-attack.mp3"
},{
  "id": "openWorldMusic",
  "src": "sounds/OpenWorldMusic.mp3"
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
    },
    quaggan: {
      attack: null,
      world: null
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