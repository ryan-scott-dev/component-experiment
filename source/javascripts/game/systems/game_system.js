Entitite.GameSystem = function(game, params) {
  Entitite.InstanceSystem.call(this, params);

  this.game = game;
  this.world = this.game.entititeWorld;
};

Entitite.GameSystem.prototype = Object.create(Entitite.InstanceSystem.prototype);
Entitite.GameSystem.prototype.constructor = Entitite.GameSystem;

Entitite.GameSystem.mixin({
  
  deleteEntityFromInstance: function(instance) {
    var entityId = instance.parentId;
    var entity = this.world.getEntity(entityId);
    this.world.releaseEntity(entity);
  },

  getSystemInstanceFromInstance: function(system, instance) {
    var entityId = instance.parentId;
    var entity = this.world.getEntity(entityId);
    return this.world.getSystem(system).getInstance(entity.components[system]);
  }

});
