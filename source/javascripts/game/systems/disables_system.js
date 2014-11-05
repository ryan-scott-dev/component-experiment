//= require game/systems/game_system

Entitite.DisableSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.DisableSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.DisableSystem.prototype.constructor = Entitite.DisableSystem;

Entitite.DisableSystem.mixin({
  
  _name: 'disable',

  initInstance: function(instance, params) {
    instance.disableLookup = params.disableTimeLookup;
  },

  updateInstance: function(instance) {
    var collisionComponent = this.getSystemInstanceFromInstance('collision', instance);
    
    if (collisionComponent.collided.length > 0) {
      for (var i = 0; i < collisionComponent.collided.length; i++) {
        var collidedInstance = collisionComponent.collided[i];
        this.disableInstance(instance, collidedInstance);
      }

      this.deleteEntityFromInstance(instance);
    }
  },

  disableInstance: function(instance, otherInstanceId) {
    var otherInstance = this.getEntityFromId(otherInstanceId);
    var otherDisabilityComponent = this.getSystemInstanceFromEntity('disability', otherInstance);

    var disableTime = instance.disableLookup[otherInstance.name];
    otherDisabilityComponent.disabled = disableTime;
  },

  destroyInstance: function(instance) {
    instance.disableLookup = null;
  }

});
