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

        background.graphics.beginBitmapFill(game.queue.getResult('grassyAreaImg'));
        background.graphics.drawRect(0, 0, canvas.width, canvas.height);

        //console.log(background);

        this.addChild(background);
    }

    createArenaUI() {
        let arenaUI = new ArenaUI();

        this.addChild(arenaUI);
        this.ui = arenaUI;
    }

    createEnemy() {
        let canvas = game.stage.canvas;
        let enemy
        if (game.fightingBoss === true) {
            enemy = new Boss();
        } else {
            enemy = new Enemy();
        }
        

        enemy.x = canvas.width - 32 - 32;
        enemy.y = canvas.height - 96;

        this.addChild(enemy);
        this.enemy = enemy;

        enemy.makeHPText('right');
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
                console.log("Enemys turn");
                this.turn = this.turns.enemy;
                game.arena.enemy.resetDices();
                this.NPCTurn(this.enemy);
                break;

            case this.turns.enemy:
                console.log("Players turn");
                this.turn = this.turns.player;
                game.player.canAttack = true;
                game.player.resetDices();
                game.arena.ui.rollDices();
                break;
        }
    }

    NPCTurn(enemy) {
        let rollFailed = false;

        for (let i = 0; i < enemy.dices.length; i++) {
            if (enemy.wantsToThrowDice()) {
                let roll = enemy.dices[i].roll();
                console.log("Enemy Roll", roll);
                if (roll === 1) {
                    rollFailed = true;
                } else {
                    enemy.setAccumulatedDmg(enemy.accumulatedDmg + roll);
                }
            } else {
                console.log('Enemy dont want to throw another dice');
            }

            if (game.fightingBoss) console.log(enemy.throws);
        }

        if (rollFailed === true) {
            console.log('Enemy Roll failed');
            game.arena.attackFailed('enemy');
            game.arena.nextTurn();
        } else if (enemy.wantsToThrowDice()) { // Lets add some nice recursion, in case enemy still wants to throw
            this.NPCTurn(enemy);
        } else {
            if (game.fightingBoss === true) {
                enemy.throws = 0;
            }
            this.attack(enemy, game.player);
        }
    }

    attackFailed(who) {
        let text = new createjs.Container();

        let whoText = new createjs.Text(
            who + 's',
            "10px 'Press Start 2P'",
            'black'
        );

        let failedText = new createjs.Text(
            'attack failed',
            "16px 'Press Start 2P",
            'black'
        );

        failedText.y = 12;

        text.addChild(whoText);
        text.addChild(failedText);

        text.x = 100;
        text.y = -100;

        this.addChild(text);

        let that = this;

        createjs.Tween.get(text)
            .to({
                y: 100
            }, 500, createjs.Ease.elasticOut)
            .wait(1000)
            .to({
                y: -100
            }, 500, createjs.Ease.elasticOut)
            .call(function() {
                that.removeChild(text);
            });
    }

    attack(attacker, target) {
        //console.log(attacker, target);
        let that = this;
        let attackerInitialX = attacker.x;

        createjs.Tween.get(attacker)
            .call(function() {
                attacker.playAttackSound();
            })
            .to({
                x: target.x + attacker.width / 2 // TODO: NICE Should be minus attacker width for player.
            }, 500, createjs.Ease.elasticOut)
            .call(function() {
                console.log("Target HP", target.hp);
                target.setHP(target.hp - attacker.accumulatedDmg);
                console.log("Target New HP", target.hp);

                // TODO: NICE Make animation showing HP being removed
                
                target.setAccumulatedDmg(0);
            })
            .wait(1000)
            .to({
                x: attackerInitialX
            }, 500, createjs.Ease.elasticOut)
            .call(function() {
                attacker.setAccumulatedDmg(0);

                if (target.hp <= 0) {
                    console.log("Target is dead!");

                    if (that.turn === that.turns.player) {
                        game.stage.addChild(new WinUI());
                        game.fightInitiator.hasEnemy = false;
                    } else {
                        game.stage.addChild(new GameOverUI());

                        // TODO: NICE Disable dices, fade them out slightly
                        // TODO: NICE Disable attack btn
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

        //this.createBackground();
        this.createDices();
        this.createAttackButton();
        this.createAccumulatedDamageText();
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
            dice.setPosition(8 + (32 + 16) * i, canvas.height - 64 + 24);
            this.addChild(dice);
            this.dices.push(dice);
        }
    }

    rollDices() {
        this.dices.forEach(dice => {
            dice.changeDiceFace(99);
        });
    }

    /**
     * If the amount of thrown dices is the same as the amount of dices, reset so player can throw again.
     */
    resetDicesIfBothIsThrown() {
        let matches = this.dices.filter(UIDice => { return UIDice.dice.thrown === true });

        if (matches.length === this.dices.length) {
            game.player.resetDices();
            this.rollDices();
        }
    }

    createAccumulatedDamageText() {
        let canvas = game.stage.canvas;
        let text = new createjs.Text(
            'DMG: 0',
            "16px 'Press Start 2P",
            'white'
        );

        text.textAlign = 'center';
        text.x = 8 + (32 + 16) * (this.amountOfDices + 1);
        text.y = canvas.height - 32;

        this.accumulatedDamageText = text;
        this.addChild(text);
    }

    updateAccumulatedDamageText(dmg) {
        this.accumulatedDamageText.text = 'DMG: ' + dmg;
    }

    createAttackButton() {
        let canvas = game.stage.canvas;
        let attackBtn = new AttackButton();
        //console.log(attackBtn);

        //attackBtn.setPosition(this.amountOfDices * 64 * 2 + 32, canvas.height - 64 + 16);
        attackBtn.setPosition(canvas.width - 128 - 8, canvas.height - 64 + 24);
        this.addChild(attackBtn);
    }
}

class ArenaUIDice extends Container {
    constructor(dice) {
        super();

        // Add PositionMixin to this class
        Object.assign(this, positionMixin);

        //console.log("Making a dice...");

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

        this.diceTexture.gotoAndPlay(animation);
    }

    roll(e) {
        let UIDice = e.target.parent;

        if (UIDice.dice.thrown === false) {
            let player = game.player;
            let roll = UIDice.dice.roll();

            console.log("Roll", roll);
            UIDice.changeDiceFace(roll); // "this" doesn't work. Use event instead

            if (roll === 1) {
                console.log('Roll failed');
                game.arena.attackFailed('player');
                player.setAccumulatedDmg(0);
                game.arena.nextTurn();
            } else {
                player.setAccumulatedDmg(player.accumulatedDmg + roll);
                UIDice.dice.thrown = true;

                game.arena.ui.resetDicesIfBothIsThrown();
            }  
        } else {
            console.log('This dice has already been thrown');
        }
        
    }
}