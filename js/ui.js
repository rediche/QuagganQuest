class Button extends Container {
    constructor(btnText) {
        super();

        // Add PositionMixin to this class
        Object.assign(this, positionMixin);

        console.log("Making new button...");

        this.background = this.createBackground();
        this.createText(btnText);

        this.addEventListener('click', this.onClick);
    }

    createBackground() {
        let background = new createjs.Shape();
        background.graphics.beginFill('black');
        background.graphics.drawRect(0, 0, 128, 32);

        background.width = 128;
        background.height = 32;

        this.addChild(background);

        return background;
    }

    createText(btnText) {
        let text = new createjs.Text(
            btnText,
            "16px 'Press Start 2P'",
            'white'
        );

        text.textAlign = 'center';
        text.textBaseline = 'middle';
        text.x = this.background.width / 2;
        text.y = this.background.height / 2;

        this.addChild(text);
    }

    onClick(e) {
        console.log(e.target, "has been clicked");
        // Something should happen if clicked
    }

}

class AttackButton extends Button {
    constructor() {
        super('ATTACK');

        console.log('Making attack button...');
    }

    onClick(e) {
        let player = game.player;

        if (game.player.canAttack === true) {
            console.log("ATTACK!");
            game.player.canAttack = false;
            // TODO: Add attack animation
        } else {
            console.log("You can't attack right now.");
        }
    }
}
