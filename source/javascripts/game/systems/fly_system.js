//= require game/systems/game_system

Entitite.FlySystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.FlySystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.FlySystem.prototype.constructor = Entitite.FlySystem;

Entitite.FlySystem.mixin({
  
  _name: 'fly',

  initInstance: function(instance, params) {
    instance.speed = params.speed;
  },

  updateInstance: function(instance) {
    var spriteComponent = this.getSystemInstanceFromInstance('sprite', instance);
    var sprite = spriteComponent.sprite;

    var disabilityComponent = this.getSystemInstanceFromInstance('disability', instance);
    if (disabilityComponent.disabled) return;

    var targetComponent = this.getSystemInstanceFromInstance('target', instance);
    var target = targetComponent.targetPosition;

    if (target) {
      sprite.rotation = this.game.physics.arcade.accelerateToXY(sprite, target.x, target.y, this.speed, this.maxSpeed, this.maxSpeed);  
    }
  }

});
