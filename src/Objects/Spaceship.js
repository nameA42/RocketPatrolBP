class Spaceship extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);

      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.points = pointValue;
      this.movespeed = game.settings.spaceshipSpeed;
    }

    update() {
        this.x -= this.movespeed;

        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width/2;
        this.y = 4*borderUISize + borderPadding+this.height + Math.random()*game.config.height*3/8;
    }
}