const MANIFEST = [{
  "id": "mapsJson",
  "src": "data/maps.json"
}];

let game = {
  stage: null,
  queue: null,
  utility: null,
  player: null,
  map: {
    obj: null,
    current: null
  },
  paused: false
};

let keys = {
  up: false,
  down: false,
  left: false,
  right: false
}