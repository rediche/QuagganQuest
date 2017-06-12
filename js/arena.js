class Arena extends Container {
    constructor() {
        super();

        //console.log("Starting arena...");
        this.createBackground();
        this.createArenaUI();
        this.createEnemy();
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

    createEnemy() {
        let canvas = game.stage.canvas;
        let enemy = new Enemy();

        enemy.x = canvas.width - 128;
        enemy.y = canvas.height - 190;

        this.addChild(enemy);
        this.enemy = enemy;
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

    nextTurn() {
        switch (this.turn) {
            case this.turns.player:
                this.turn = this.turns.enemy;
                // TODO: add enemy attacking
                break;
            case this.turns.enemy:
                this.turn = this.turns.player;
                break;
        }
    }

    attack(attacker, target) {
        console.log(attacker, target);
        let that = this;
        let attackerInitialX = attacker.x;

        createjs.Tween.get(attacker)
            .to({
                x: target.x + attacker.width / 2 // TODO: Should be minus attacker width for player.
            }, 500, createjs.Ease.elasticOut)
            .call(function() {
                console.log("Target HP", target.hp);
                target.setHP(target.hp - attacker.accumulatedDmg);
                console.log("Target New HP", target.hp);

                // TODO: Make animation showing HP being removed
                
                target.setAccumulatedDmg(0);
            })
            .wait(1000)
            .to({
                x: attackerInitialX
            }, 500, createjs.Ease.elasticOut)
            .call(function() {
                if (target.hp <= 0) {
                    console.log("Target is dead!");

                    if (that.turn === that.turns.player) {
                        game.player.canAttack = true;

                        // TODO: Play win animation and then go back to map
                    } else {
                        // TODO: Add respawn screen (GAME OVER)
                    }
                } else {
                    that.nextTurn();
                }
            });
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

            if (roll === 1) {
                console.log('Roll failed');
                game.arena.nextTurn();
            } else {
                UIDice.changeDiceFace(roll); // "this" doesn't work. Use event instead
                player.setAccumulatedDmg(player.accumulatedDmg + roll);
                UIDice.thrown = true;
            }

            
        } else {
            console.log('This dice has already been thrown');
        }
        
    }
}