//= require game/systems/game_system

Entitite.TargetSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.TargetSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.TargetSystem.prototype.constructor = Entitite.TargetSystem;

Entitite.TargetSystem.mixin({
  
  _name: 'target',

  initInstance: function(instance, params) {
    instance.targetPreferences = instance.targetPreferences || params.targetPreferences;
    instance.team = instance.team || params.team;
  },

  updateInstance: function(instance) {
    this.updateTarget(instance);
  },

  destroyInstance: function(instance) {
    instance.target = null;
  },

  updateTarget: function(instance) {
    var spriteComponent = this.getSystemInstanceFromInstance('sprite', instance);
    var sprite = spriteComponent.sprite;

    var preferences = instance.targetPreferences;
    var team = instance.team;
    var targetSprite = this.game.findTargetForPreferences(sprite, preferences, team);
    
    if (targetSprite) {
      var attackMovementSpeed = 3;
      var targetVelocity = targetSprite.body.velocity.clone();
      var targetOffset = targetVelocity.multiply(attackMovementSpeed, attackMovementSpeed);
      instance.targetPosition = Phaser.Point.add(targetSprite.position, targetOffset);
    } else {
      instance.targetPosition = null;
    }
    
  }

});
