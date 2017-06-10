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
    }

    createBackground() {
        let canvas = game.stage.canvas;

        let background = new createjs.Shape();
        background.graphics.beginFill('hotpink');
        background.graphics.drawRect(0, 0, canvas.width, canvas.height / 4);

        background.y = canvas.height / 4 * 3;

        this.addChild(background);
    }

    createDices() {
        this.dices = [];

        for (let i = 0; i < this.amountOfDices; i++) {
            let dice = new ArenaUIDice();
            this.addChild(dice);
            this.dices.push(dice);
        }
    }
}

class ArenaUIDice extends Container {
    constructor() {
        super();

        console.log("Making a dice...");
    }
}