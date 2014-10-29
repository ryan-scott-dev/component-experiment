//= require game/systems/game_system

Entitite.FlySystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.FlySystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.FlySystem.prototype.constructor = Entitite.FlySystem;

Entitite.FlySystem.mixin({
  
  _name: 'fly',

  initInstance: function(instance) {
  },

  updateInstance: function(instance) {
    var spriteComponent = this.getSystemInstanceFromInstance('sprite', instance);
    var sprite = spriteComponent.sprite;
    // spriteComponent.sprite.position += 0.01;

    sprite.rotation = this.game.physics.arcade.moveToXY(sprite, 650, 250, 200);
  },

});
