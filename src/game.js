import Paddle from './paddle.js'
import InputHandler from './input.js'
import Ball from './ball.js'
import Brick from './brick.js'
import { buildLevel, level1} from './levels.js'
import Logo from './logo.js'

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
    }

    start() {
        this.GAMESTATE = GAMESTATE.RUNNING
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        let bricks = buildLevel(this, level1);
        let logo = new Logo(this, {x: 20, y: 20})


        this.gameObjects = [
            this.ball,
            this.paddle,
            ...bricks,
            logo
        ]

        new InputHandler(this.paddle, this)
    }

    update(deltaTime) {
        if(this.gamestate  == GAMESTATE.PAUSED) return;

        this.gameObjects.forEach(object => object.update(deltaTime))

        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion)
    }

    draw(ctx) {
        this.gameObjects.forEach(object => object.draw(ctx))

        if (this.gamestate == GAMESTATE.PAUSED) {
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill()
        }
    }

    togglePause() {
        if(this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}