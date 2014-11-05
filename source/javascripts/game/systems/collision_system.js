//= require game/systems/game_system

Entitite.CollisionSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.CollisionSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.CollisionSystem.prototype.constructor = Entitite.CollisionSystem;

Entitite.CollisionSystem.mixin({
  
  _name: 'collision',

  initInstance: function(instance, params) {
    instance.team = params.team;
    instance.type = params.collisionType;
    instance.collided = params.collided || [];
  },

  updateInstance: function(instance) {
    if (instance.type !== 'projectile') return;

    this.updateCollisions(instance);
  },

  destroyInstance: function(instance) {
    instance.type = null;
    instance.team = null;
  },

  updateCollisions: function(instance) {
    instance.collided.length = 0;
    var spriteComponent = this.getSystemInstanceFromInstance('sprite', instance);
    var sprite = spriteComponent.sprite;

    // N^2 :(
    this.entities.forEach(function(otherInstance, index) {
      if (!otherInstance.alive || otherInstance.idx === instance.idx) return;
      if (otherInstance.team === instance.team) return;
      if (otherInstance.type !== 'target') return;

      var otherSpriteComponent = this.getSystemInstanceFromInstance('sprite', otherInstance);
      var otherSprite = otherSpriteComponent.sprite;

      // Check for a collision
      this.game.physics.arcade.collide(sprite, otherSprite, function() {
        instance.collided.push(otherInstance.parentId);
      }, function(first, second) {
        return otherInstance.team !== instance.team && otherInstance.type === 'target';
      });
    }.bind(this));
  }

});
