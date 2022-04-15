class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
  
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setCollideWorldBounds(true);
      this.isfiring = false;
      this.movespeed = 2.0;
      this.flyspeed = 2.5;
      this.y -= this.height;
    }
    
    update() {
        this.setVelocityX(0);
        if(keyLEFT.isDown){
            this.setVelocityX(-100*this.movespeed);
        }
        else if(keyRIGHT.isDown){
            this.setVelocityX(100*this.movespeed);
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isfiring) {
            this.isfiring = true;
            this.sfxRocket.play();  // play sfx
        }
        if(this.isfiring){
            this.setVelocityY(-100*this.flyspeed);
        }
    }
    
    reset() {
        this.isfiring = false;
        this.setVelocity(0,0);
        this.y = game.config.height - borderUISize - borderPadding - this.height;
    }
}