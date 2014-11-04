//= require game/systems/game_system

Entitite.LifespanSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.LifespanSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.LifespanSystem.prototype.constructor = Entitite.LifespanSystem;

Entitite.LifespanSystem.mixin({
  
  _name: 'lifespan',

  initInstance: function(instance, params) {
    instance.lifespan = params.lifespan || 3000;
    instance.timeAlive = params.timeAlive || 0;
  },

  updateInstance: function(instance) {
    instance.timeAlive += this.game.time.elapsed;

    if (instance.timeAlive >= instance.lifespan) {
      this.deleteEntityFromInstance(instance);
    }
  },

  destroyInstance: function(instance) {
    instance.lifespan = null;
    instance.timeAlive = null;
  }

});
