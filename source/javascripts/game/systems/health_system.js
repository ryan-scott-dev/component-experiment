Entitite.HealthSystem = function(game, params) {
  Entitite.InstanceSystem.call(this, params);

  this.game = game;
};

Entitite.HealthSystem.prototype = Object.create(Entitite.InstanceSystem.prototype);
Entitite.HealthSystem.prototype.constructor = Entitite.HealthSystem;

Entitite.HealthSystem.mixin({
  
  _name: 'health',

  initInstance: function(instance, params) {
    instance.health = params.health || 100;
  },

  updateInstance: function(instance) {
    if (instance.health <= 0) {
      this.game.entititeWorld.deleteEntity('health', instance.idx);
    }
  },

  destroyInstance: function(instance) {
    instance.health = null;
  }

});
