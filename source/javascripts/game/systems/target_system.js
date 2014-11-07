//= require game/systems/game_system

Entitite.TargetSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.TargetSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.TargetSystem.prototype.constructor = Entitite.TargetSystem;

Entitite.TargetSystem.mixin({
  
  _name: 'target',

  initInstance: function(instance, params) {
    instance.targetPreferences = params.targetPreferences;
    instance.team = params.team;
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
    var targetSprite = this.findTargetForPreferences(sprite, preferences, team);
    
    if (targetSprite) {
      var attackMovementSpeed = 3;
      var targetVelocity = targetSprite.body.velocity.clone();
      var targetOffset = targetVelocity.multiply(attackMovementSpeed, attackMovementSpeed);
      instance.targetPosition = targetSprite.position//Phaser.Point.add(targetSprite.position, targetOffset);
    } else {
      instance.targetPosition = null;
    }
    
  },

  findTargetForPreferences: function(sprite, preferences, sourceTeam) {
    var teamSystem = this.world.getSystem('team');
    var spriteSystem = this.world.getSystem('sprite');

    var nearbyTargets = [];

    // Find nearby entities not of the source team
    teamSystem.forEach(function(teamInstance) { 
      if (teamInstance.alive && teamInstance.team !== sourceTeam) {
        var entityId = teamInstance.parentId;
        var entity = this.world.getEntity(entityId);
        var entitySprite = this.world.getSystemEntity('sprite', entity);
        var type = entity.name;

        // Calculate distance
        var distance = sprite.position.distance(entitySprite.sprite.position);
        
        // Store sprite id mapped to distance
        nearbyTargets.push({ sprite: entitySprite.sprite, position: entitySprite.sprite.position, distance: distance, type: type });
      }
    }.bind(this));

    // Sorted by preferences * distance
    sortedTargets = nearbyTargets.sort(function(a, b) {
      var diff = Math.abs(b.distance - a.distance);
      if (diff < 400) {
        if (preferences[a.type] < preferences[b.type]) return 1;
        if (preferences[a.type] > preferences[b.type]) return -1;
        return 0;
      }

      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      if (a.distance == b.distance) return 0;
      return 10000;
    });

    if (sortedTargets.length > 0) 
      return sortedTargets[0].sprite;

    return null;
  }

});
