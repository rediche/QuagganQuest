const MANIFEST = [{
  "id": "mapsJson",
  "src": "data/maps.json"
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