class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }


    create() {
        cam = this.cameras.main;

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.physics.world.setBounds(borderUISize, 0, game.config.width-2*borderUISize, game.config.height-borderUISize);

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
        //rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0, 0).setScale(3,3).refreshBody();

        //ships
        ships = this.physics.add.group({ allowGravity: false , runChildUpdate: true});
        ships.add(new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0));
        ships.add(new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0));
        ships.add(new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0));

        
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        
        // green UI background
        greentop = this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        this.physics.add.existing(greentop);
        greentop.body.setImmovable(true);

        // white borders
        this.add.rectangle(-borderOver, -borderOver, game.config.width+2*borderOver, borderUISize+borderOver, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(-borderOver, game.config.height - borderUISize, game.config.width+2*borderOver, borderUISize+borderOver, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(-borderOver, -borderOver, borderUISize+borderOver, game.config.height+2*borderOver, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, -borderOver, borderUISize+borderOver, game.config.height+2*borderOver, 0xFFFFFF).setOrigin(0, 0);
        
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.physics.add.collider(this.p1Rocket, greentop, this.resetRocket, null, this.p1Rocket);
        this.physics.add.overlap(this.p1Rocket, ships, this.shipExplode, null, this);
    }

    update() {
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
        } 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
    }

    resetRocket(rockt)
    {
        rockt.reset();
    }

    shipExplode(rocket, ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation  
        this.sound.play('sfx_explosion');
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });    
        rocket.reset();
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
      }
}