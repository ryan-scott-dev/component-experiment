//= require game/systems/game_system

Entitite.PhysicsSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.PhysicsSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.PhysicsSystem.prototype.constructor = Entitite.PhysicsSystem;

Entitite.PhysicsSystem.mixin({
  
  _name: 'physics',

});
