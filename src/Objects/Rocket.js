class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
  
      // add object to existing scene
      scene.add.existing(this);
      this.isfiring = false;
      this.movespeed = 2.0;
      this.flyspeed = 2.5;
    }
    
    update() {
        if(!this.isfiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.movespeed;
            }
            else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.movespeed;
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isfiring) {
            this.isfiring = true;
            this.sfxRocket.play();  // play sfx
        }
        if(this.isfiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.flyspeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }
    
    reset() {
        this.isfiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}