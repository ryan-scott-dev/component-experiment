//= require game/systems/game_system

Entitite.DamageSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.DamageSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.DamageSystem.prototype.constructor = Entitite.DamageSystem;

Entitite.DamageSystem.mixin({
  
  _name: 'damage',

  initInstance: function(instance, params) {
    instance.damageLookup = params.damageLookup;
  },

  updateInstance: function(instance) {
    var collisionComponent = this.getSystemInstanceFromInstance('collision', instance);
    
    if (collisionComponent.collided.length > 0) {
      for (var i = 0; i < collisionComponent.collided.length; i++) {
        var collidedInstance = collisionComponent.collided[i];
        this.damageInstance(instance, collidedInstance);
      }

      this.deleteEntityFromInstance(instance);
    }
  },

  damageInstance: function(instance, otherInstanceId) {
    var otherInstance = this.getEntityFromId(otherInstanceId);
    var otherHealthComponent = this.getSystemInstanceFromEntity('health', otherInstance);

    // Determine damage
    var damage = instance.damageLookup[otherInstance.name];

    otherHealthComponent.health -= damage;
  },

  destroyInstance: function(instance) {
    instance.damageLookup = null;
  }

});
