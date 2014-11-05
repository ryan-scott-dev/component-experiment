//= require game/systems/game_system

Entitite.ProjectileSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.ProjectileSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.ProjectileSystem.prototype.constructor = Entitite.ProjectileSystem;

Entitite.ProjectileSystem.mixin({
  
  _name: 'projectile',

  initInstance: function(instance, params) {
    instance.speed = params.speed;
    instance.maxSpeed = params.maxSpeed;
  },

  updateInstance: function(instance) {
    var spriteComponent = this.getSystemInstanceFromInstance('sprite', instance);
    var sprite = spriteComponent.sprite;

    sprite.body.acceleration.setTo(Math.cos(sprite.rotation) * instance.speed, Math.sin(sprite.rotation) * instance.speed);
    sprite.body.maxVelocity.setTo(instance.maxSpeed, instance.maxSpeed);

    // this.game.physics.arcade.accelerateToXY(sprite, target.x, target.y, this.speed, this.maxSpeed, this.maxSpeed);
  },

  destroyInstance: function(instance) {
    instance.speed = null;
    instance.maxSpeed = null;
  }

});
