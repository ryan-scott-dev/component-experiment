Entitite.GameSystem = function(game, params) {
  Entitite.InstanceSystem.call(this, params);

  this.game = game;
  this.world = this.game.entititeWorld;
};

Entitite.GameSystem.prototype = Object.create(Entitite.InstanceSystem.prototype);
Entitite.GameSystem.prototype.constructor = Entitite.GameSystem;

Entitite.GameSystem.mixin({
  
  deleteEntity: function(entityRef) {
    var entity = this.world.findEntity(entityRef);
    this.world.releaseEntity(entity);
  },

  getSystemInstance: function(system, entityRef) {
    var entity = this.world.findEntity(entityRef);
    return this.world.getSystem(system).getInstance(entity.components[system]);
  }

});
