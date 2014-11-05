//= require game/systems/game_system

Entitite.RotateSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.RotateSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.RotateSystem.prototype.constructor = Entitite.RotateSystem;

Entitite.RotateSystem.mixin({
  
  _name: 'rotate',

  updateInstance: function(instance) {
    var disabilityComponent = this.getSystemInstanceFromInstance('disability', instance);
    if (disabilityComponent.disabled) return;

    var spriteComponent = this.getSystemInstanceFromInstance('sprite', instance);
    spriteComponent.sprite.rotation += 0.01;
  },

});
