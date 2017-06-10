class Arena extends Container {
    constructor() {
        super();

        console.log("Starting arena...");
        this.createBackground();
        this.createArenaUI();
    }

    createBackground() {
        let canvas = game.stage.canvas;

        let background = new createjs.Shape();

        background.graphics.beginFill('lightblue');
        background.graphics.drawRect(0, 0, canvas.width, canvas.height);

        console.log(background);

        this.addChild(background);
    }

    createArenaUI() {
        let arenaUI = new ArenaUI();

        this.addChild(arenaUI);
    }
}

class ArenaUI extends Container {
    constructor() {
        super();

        console.log("Making ArenaUI...");
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
        console.log(attackBtn);

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

        //this.createBackground();
        this.createDiceTexture();

        this.addEventListener('click', this.roll);
    }

    createDiceTexture() {
        let texture = new createjs.Sprite(game.spritesheets.dices.basic, "roll");

        this.addChild(texture);
    }

    roll() {
        console.log(game.utility.generateRandomNumber(1, 6));
    }
}