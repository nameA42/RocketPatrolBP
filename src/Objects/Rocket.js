class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, LK, RK, FK, cam) {
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
      this.RK = RK;
      this.LK = LK;
      this.FK = FK;
      this.cam = cam;
      this.score = 0;
    }
    
    update() {
        this.rotation = 0;
        this.setVelocityX(0);
        if(this.LK.isDown){
            this.setVelocityX(-100*this.movespeed);
            this.rotation = -Math.PI/4;
        }
        else if(this.RK.isDown){
            this.setVelocityX(100*this.movespeed);
            this.rotation = Math.PI/4;
        }
        if(Phaser.Input.Keyboard.JustDown(this.FK) && !this.isfiring) {
            this.isfiring = true;
            this.sfxRocket.play();  // play sfx
        }
        if(this.isfiring){
            this.setVelocityY(-50*this.flyspeed);
            this.cam.setZoom(Math.min(this.cam.zoom*1.01, 2));
            this.cam.centerOn(this.x, this.y);
        }
    }
    
    reset() {
        this.isfiring = false;
        this.setVelocity(0,0);
        this.y = game.config.height - borderUISize - borderPadding - this.height;
        this.cam.centerOn(game.config.width/4, game.config.height/2);
        this.cam.zoom = 1;
        this.cam.flash();
    }
}