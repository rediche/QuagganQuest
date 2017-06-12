class Arena extends Container {
    constructor() {
        super();

        //console.log("Starting arena...");
        this.createBackground();
        this.createArenaUI();
        this.setTurn();
    }

    createBackground() {
        let canvas = game.stage.canvas;

        let background = new createjs.Shape();

        background.graphics.beginFill('lightblue');
        background.graphics.drawRect(0, 0, canvas.width, canvas.height);

        //console.log(background);

        this.addChild(background);
    }

    createArenaUI() {
        let arenaUI = new ArenaUI();

        this.addChild(arenaUI);
    }

    setTurn(who = 'player') {
        let player = game.player;

        if (this.turns === undefined) {
            // Set players turn
            this.turns = {
                player: 'player',
                enemy: 'enemy'
            };
        } 

        this.turn = who;

        if (this.turn === this.turns.player) {
            player.canAttack = true;
        } else {
            player.canAttack = false;
        }
    }

}

class ArenaCharacters extends Container {
    constructor() {
        super();

        this.createCharacter();
    }

    createCharacter() {
        let character = new createjs.Shape();

        character.graphics.beginFill('black');
        character.graphics.drawRect(0, 0, 32, 64);

        this.addChild(character);
        this.character = character;
    }
}

class ArenaUI extends Container {
    constructor() {
        super();

        //console.log("Making ArenaUI...");
        this.amountOfDices = game.player.dices.length;

        this.createBackground();
        this.createDices();
        this.createAttackButton();
    }

    createBackground() {
        let canvas = game.stage.canvas;

        let background = new createjs.Shape();
        background.graphics.beginFill('hotpink');
        background.graphics.drawRect(0, 0, canvas.width, 64);

        background.y = canvas.height - 64;

        this.addChild(background);
    }

    createDices() {
        let canvas = game.stage.canvas;

        this.dices = [];

        for (let i = 0; i < this.amountOfDices; i++) {
            let dice = new ArenaUIDice(game.player.dices[i]);
            dice.setPosition(16 + (32 + 16) * i, canvas.height - 64 + 16);
            this.addChild(dice);
            this.dices.push(dice);
        }
    }

    createAttackButton() {
        let canvas = game.stage.canvas;
        let attackBtn = new AttackButton();
        //console.log(attackBtn);

        attackBtn.setPosition(this.amountOfDices * 64 * 2 + 32, canvas.height - 64 + 16);

        this.addChild(attackBtn);
    }
}

class ArenaUIDice extends Container {
    constructor(dice) {
        super();

        // Add PositionMixin to this class
        Object.assign(this, positionMixin);

        console.log("Making a dice...");

        // Set defaults
        this.dice = dice;
        this.thrown = false;

        //this.createBackground();
        this.createDiceTexture();

        this.addEventListener('click', this.roll);
    }

    createDiceTexture() {
        let texture = new createjs.Sprite(game.spritesheets.dices.basic, "roll");

        this.addChild(texture);
        this.diceTexture = texture;
    }

    changeDiceFace(face) {
        let animation = null;

        switch (face) {
            case 0: 
                animation = 'all';
            break;
            case 1:
                animation = 'one';
            break;
            case 2:
                animation = 'two';
            break;
            case 3:
                animation = 'three';
            break;
            case 4:
                animation = 'four';
            break;
            case 5:
                animation = 'five';
            break;
            case 6:
                animation = 'six';
            break;
            case 99:
                animation = 'roll';
            break;
        }

        return this.diceTexture.gotoAndPlay(animation);
    }

    roll(e) {
        let UIDice = e.target.parent;

        if (UIDice.thrown === false) {
            let player = game.player;
            let roll = UIDice.dice.roll();

            UIDice.changeDiceFace(roll); // "this" doesn't work. Use event instead
            player.setAccumulatedDmg(roll);

            UIDice.thrown = true;
        } else {
            console.log('This dice has already been thrown');
        }
        
    }
}