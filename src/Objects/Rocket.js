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
            this.setVelocityY(-50*this.flyspeed);
            cam.setZoom(Math.min(cam.zoom*1.01, 2));
            cam.centerOn(this.x, this.y);
        }
    }
    
    reset() {
        this.isfiring = false;
        this.setVelocity(0,0);
        this.y = game.config.height - borderUISize - borderPadding - this.height;
        cam.centerOn(game.config.width/2, game.config.height/2);
        cam.zoom = 1;
        cam.flash();
    }
}