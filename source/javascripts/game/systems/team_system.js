//= require game/systems/game_system

Entitite.TeamSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.TeamSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.TeamSystem.prototype.constructor = Entitite.TeamSystem;

Entitite.TeamSystem.mixin({
  
  _name: 'team',

  initInstance: function(instance, params) {
    instance.team = params.team;
  },

});
