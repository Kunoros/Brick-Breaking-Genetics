export default class Logo {

    constructor( game, position) {
        this.image = document.getElementById('img_logo')

        this.game = game;

        this.position = position;
        this.width = 1400;
        this.height = 300;
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}