 let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 480,
    physics: 
    {
        default: 'arcade',
        arcade: {
            debug: false   
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
var greentop, ships;
let borderOver = 500;

// reserve keyboard vars
let keyUP, keyR, keyLEFT, keyRIGHT, keyA, keyS, keyD;

/*
Point Breakdown

PvP collision (+5) - 5
    [implementing arcade took up most of my development time]

Random Ship Direction (+5) - 10

New Background (+5) - 15

Control after Fire (+5) - 20

Time Display (+10) - 30

Zoom and Flash (+10) - 40
    [the zoom and flashing screen on death takes about as much time and research as the Time display]

New Border UI (+10) - 50
    [extended UI and add border for split screen/zoom compatibility]

New Assets (+20) - 70

Split Screen (+20) - 90
    [with seperate text and camera displays, I think this is about a +20]

Simultanious 2 player (+30) - 120

TOTAL: 120
*/