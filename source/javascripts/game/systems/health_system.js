//= require game/systems/game_system

Entitite.HealthSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.HealthSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.HealthSystem.prototype.constructor = Entitite.HealthSystem;

Entitite.HealthSystem.mixin({
  
  _name: 'health',

  initInstance: function(instance, params) {
    instance.health = params.health;
  },

  updateInstance: function(instance) {
    if (instance.health <= 0) {
      this.deleteEntityFromInstance(instance);
    }
  },

  destroyInstance: function(instance) {
    instance.health = null;
  }

});
