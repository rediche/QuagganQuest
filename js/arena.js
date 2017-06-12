class Arena extends Container {
    constructor() {
        super();

        //console.log("Starting arena...");
        this.createBackground();
        this.createArenaUI();
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

    createCharacters() {
        
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
        this.amountOfDices = 2;

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
            let dice = new ArenaUIDice();
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
    constructor() {
        super();

        // Add PositionMixin to this class
        Object.assign(this, positionMixin);

        console.log("Making a dice...");

        // Set defaults

        //this.createBackground();
        this.createDiceTexture();

        this.addEventListener('click', this.roll);
    }

    createDiceTexture() {
        let texture = new createjs.Sprite(game.spritesheets.dices.basic, "roll");

        this.addChild(texture);
        this.dice = texture;
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

        return this.dice.gotoAndPlay(animation);
    }

    roll(e) {
        let roll = game.utility.generateRandomNumber(1, 6);
        e.target.parent.changeDiceFace(roll); // "this" doesn't work. Use event instead

        return roll;
    }
}