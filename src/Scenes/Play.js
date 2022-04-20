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
        this.cameras.main.setSize(640, 480);
        const camp1 = this.cameras.add(0 , 0, 640, 480);
        const camp2 = this.cameras.add(640, 0, 640, 480);

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.physics.world.setBounds(borderUISize, 0, game.config.width/2-2*borderUISize, game.config.height-borderUISize);

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
        //rockets
        this.p1Rocket = new Rocket(this, game.config.width/4, game.config.height - borderUISize - borderPadding, 'rocket', null, keyLEFT, keyRIGHT, keyUP, camp1).setOrigin(0.5, 0.5).setScale(3,3).refreshBody();
        this.p2Rocket = new Rocket(this, game.config.width/4, game.config.height - borderUISize - borderPadding, 'rocket', null, keyA, keyS, keyD, camp2).setOrigin(0.5, 0.5).setScale(3,3).refreshBody();
        this.p1Rocket.setTint(0xff0000);
        this.p2Rocket.setTint(0x00ff00);
        
        //ships
        ships = this.physics.add.group({ allowGravity: false , runChildUpdate: true});
        ships.add(new Spaceship(this, game.config.width/2 + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0));
        ships.add(new Spaceship(this, game.config.width/2 + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0));
        ships.add(new Spaceship(this, game.config.width/2, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0));
        
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        
        // green UI background
        greentop = this.add.rectangle(0, borderUISize + borderPadding, game.config.width/2, borderUISize * 2, 0x00FFFF).setOrigin(0, 0);
        this.physics.add.existing(greentop);
        greentop.body.setImmovable(true);

        // white borders
        this.add.rectangle(-borderOver, -borderOver, game.config.width/2+2*borderOver, borderUISize+borderOver, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(-borderOver, game.config.height - borderUISize, game.config.width/2+2*borderOver, borderUISize+borderOver, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(-borderOver, -borderOver, borderUISize+borderOver, game.config.height+2*borderOver, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width/2 - borderUISize, -borderOver, borderUISize+borderOver, game.config.height+2*borderOver, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width/2 - borderUISize/4, -borderOver, borderUISize/4, game.config.height+2*borderOver, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, -borderOver, borderUISize/4, game.config.height+2*borderOver, 0x000).setOrigin(0, 0);

        //score
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
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 0, scoreConfig);
        this.scoreRight = this.add.text(game.config.width/2 - borderUISize - borderPadding - 100, borderUISize + borderPadding*2, 0, scoreConfig);
        
        //playertell
        scoreConfig.fixedWidth = 150;
        scoreConfig.backgroundColor = '#FF0000';
        this.p1tell = this.add.text(game.config.width/4 - 150/2, borderUISize + borderPadding*2, "Player 1", scoreConfig);
        scoreConfig.backgroundColor = '#00FF00';
        this.p2tell = this.add.text(game.config.width/4 - 150/2, borderUISize + borderPadding*2, "Player 2", scoreConfig);
        camp1.ignore(this.p2tell);
        camp2.ignore(this.p1tell);

        this.gameOver = false;

        scoreConfig.fixedWidth = 40;
        scoreConfig.backgroundColor = '#F3B141'
        this.timtext = this.add.text(game.config.width/4-20, borderUISize + borderPadding*6, 0, scoreConfig);
        
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/4, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/4, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.physics.add.collider(this.p1Rocket, greentop, this.resetRocket, null, this.p1Rocket);
        this.physics.add.overlap(this.p1Rocket, ships, this.shipExplode, null, this);
        this.physics.add.collider(this.p2Rocket, greentop, this.resetRocket, null, this.p2Rocket);
        this.physics.add.overlap(this.p2Rocket, ships, this.shipExplode, null, this);
    }

    update() {
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.p2Rocket.update();         // update rocket sprite
        } 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        this.timtext.text = Math.max(0, 60 - Math.floor(this.time.now/1000));
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
        rocket.score += ship.points;
        this.scoreLeft.text = this.p1Rocket.score; 
        this.scoreRight.text = this.p2Rocket.score; 
      }
}