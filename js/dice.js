class Dice {
  constructor(min, max, skin = 'basic') {
    this.min = min;
    this.max = max;
    this.skin = skin;
    this.thrown = false;
  }

  roll() {
    return game.utility.generateRandomNumber(this.min, this.max);
  }
}