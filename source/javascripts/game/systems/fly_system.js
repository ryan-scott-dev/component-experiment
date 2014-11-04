//= require game/systems/game_system

Entitite.FlySystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);

  this.cohesionWeight = 40;
  this.cohesionDistance = 100;

  this.separationDistance = 100;

  this.alignmentWeight = 8;

  this.speed = 100;
};

Entitite.FlySystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.FlySystem.prototype.constructor = Entitite.FlySystem;

Entitite.FlySystem.mixin({
  
  _name: 'fly',

  initInstance: function(instance, params) {
    instance.speed = instance.speed || params.speed;
  },

  updateInstance: function(instance) {
    var spriteComponent = this.getSystemInstanceFromInstance('sprite', instance);
    var sprite = spriteComponent.sprite;

    var targetComponent = this.getSystemInstanceFromInstance('target', instance);
    var target = targetComponent.targetPosition;

    if (target) {
      sprite.rotation = this.game.physics.arcade.accelerateToXY(sprite, target.x, target.y, this.speed, this.maxSpeed, this.maxSpeed);  
    }
  },

  calculateCohesion: function(instance) {
    var centre = new Phaser.Point(0, 0);
    var aliveCount = 0;
    var difference = new Phaser.Point(0, 0);
    var distance;

    this.entities.forEach(function(otherInstance, index) {
      if (otherInstance.alive && 
          otherInstance.idx !== instance.idx && 
          otherInstance.cached_position) {

        difference.x = otherInstance.cached_position.x - instance.cached_position.x;
        difference.y = otherInstance.cached_position.y - instance.cached_position.y;
        distance = difference.getMagnitude();

        // if (distance > 0 && distance < this.cohesionDistance) {
          aliveCount += 1;
          centre.x += otherInstance.cached_position.x;
          centre.y += otherInstance.cached_position.y;
        // }
      }
    });

    if (aliveCount > 0) {
      centre.x /= aliveCount;
      centre.y /= aliveCount;  
    }

    centre.x = (centre.x - instance.cached_position.x) / this.cohesionWeight;
    centre.y = (centre.y - instance.cached_position.y) / this.cohesionWeight;
    
    return centre;
  },

  calculateSeperation: function(instance) {
    var centre = new Phaser.Point(0, 0);
    var difference = new Phaser.Point(0, 0);

    this.entities.forEach(function(otherInstance, index) {
      if (otherInstance.alive && 
          otherInstance.idx !== instance.idx && 
          otherInstance.cached_position) {

        difference.x = otherInstance.cached_position.x - instance.cached_position.x;
        difference.y = otherInstance.cached_position.y - instance.cached_position.y;
        
        if (difference.getMagnitude() < this.separationDistance) {
          centre.x -= difference.x;
          centre.y -= difference.y;
        }
      }
    });

    return centre;
  },

  calculateAlignment: function(instance) {
    var centre = new Phaser.Point(0, 0);
    var aliveCount = 0;

    this.entities.forEach(function(otherInstance, index) {
      if (otherInstance.alive && 
          otherInstance.idx !== instance.idx && 
          otherInstance.cached_velocity) {

        aliveCount += 1;
        centre.x += otherInstance.cached_velocity.x;
        centre.y += otherInstance.cached_velocity.y;
      }
    });

    if (aliveCount > 0) {
      centre.x /= aliveCount;
      centre.y /= aliveCount;  
    }
    
    centre.x = (centre.x - instance.cached_velocity.x) / this.alignmentWeight;
    centre.y = (centre.y - instance.cached_velocity.y) / this.alignmentWeight;

    return centre;
  },

  calculateGoal: function(instance) {
    return new Phaser.Point(0, 0);
  }

});
