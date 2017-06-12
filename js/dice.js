class Dice {
  constructor(min, max, skin = 'basic') {
    this.min = min;
    this.max = max;
    this.skin = skin;
  }

  roll() {
    return game.utility.generateRandomNumber(this.min, this.max);
  }
}