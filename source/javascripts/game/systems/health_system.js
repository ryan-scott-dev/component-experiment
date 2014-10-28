Entitite.HealthSystem = function(game, params) {
  Entitite.InstanceSystem.call(this, params);

  this.game = game;
};

Entitite.HealthSystem.prototype = Object.create(Entitite.InstanceSystem.prototype);
Entitite.HealthSystem.prototype.constructor = Entitite.HealthSystem;

Entitite.HealthSystem.mixin({
  
  _name: 'health',

  initInstance: function(instance, params) {
    instance.health = params.health || 10;
  },

  updateInstance: function(instance) {
    instance.health -= 0.1;

    if (instance.health <= 0) {
      // Callback when entity is destroyed
      // Trigger deletion of entity
      this.game.entititeWorld.deleteEntity('health', instance.idx);
    }
  },

  destroyInstance: function(instance) {
    instance.health = null;
  }

});
