 let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: 
    {
        default: 'arcade',
        arcade: {
            debug: true   
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
var greentop, ships;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

