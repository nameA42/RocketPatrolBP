class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      }

    create() {
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: '26px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/4, game.config.height/2 - 2*borderUISize - 2*borderPadding, 'Player 1', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/4, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/4, game.config.height/2, 'use <-> arrows to move & ^ arrow to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FF0000';
        menuConfig.color = '#000';
        this.add.text(game.config.width/4, game.config.height/2 + borderUISize + borderPadding, 'p1 press <- for novice & -> for expert', menuConfig).setOrigin(0.5);
        
        menuConfig.backgroundColor = '#F3B141';
        menuConfig.color = '#843605';
        this.add.text(game.config.width*3/4, game.config.height/2 - 2*borderUISize - 2*borderPadding, 'Player 2', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width*3/4, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width*3/4, game.config.height/2, 'use (A) (S) keys to move & (D) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width*3/4, game.config.height/2 + borderUISize + borderPadding, 'p1 press <- for novice & -> for expert', menuConfig).setOrigin(0.5);

    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
      }
}