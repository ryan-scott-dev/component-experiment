//= require game/systems/game_system

Entitite.AttackSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.AttackSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.AttackSystem.prototype.constructor = Entitite.AttackSystem;

Entitite.AttackSystem.mixin({
  
  _name: 'attack',

  initInstance: function(instance, params) {
    instance.attackType = params.attackType;
    instance.attackRate = params.attackRate;
    instance.attackRange = params.attackRange;
    instance.attackTimer = params.attackTimer || 0;
    instance.team = params.team;
  },

  updateInstance: function(instance) {
    var disabilityComponent = this.getSystemInstanceFromInstance('disability', instance);
    if (disabilityComponent.disabled) return;

    instance.attackTimer += this.game.time.elapsed;

    if (instance.attackTimer > instance.attackRate) {
      var targetComponent = this.getSystemInstanceFromInstance('target', instance);
      var targetPosition = targetComponent.targetPosition;

      var spriteComponent = this.getSystemInstanceFromInstance('sprite', instance);
      var sprite = spriteComponent.sprite;
      var position = sprite.position;

      if (!!targetPosition && this.canAttackTarget(instance, position, targetPosition)) {
        this.spawnAttack(instance, position, targetPosition);
      }
    }
  },

  canAttackTarget: function(instance, position, target) {
    var distance = Phaser.Math.distance(position.x, position.y, target.x, target.y);
    return distance < instance.attackRange;
  },

  spawnAttack: function(instance, position, target) {
    var rotation = position.angle(target);
    var spawnParams = {
      position: position,
      rotation: rotation,
      team: instance.team
    };
    this.spawnFromTemplate(instance.attackType, spawnParams);

    instance.attackTimer = 0;  
  },

  spawnFromTemplate: function(template, params) {
    this.world.acquireTemplateEntity(template, params);
  }
});
