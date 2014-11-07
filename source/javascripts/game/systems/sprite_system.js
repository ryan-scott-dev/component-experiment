//= require game/systems/game_system

Entitite.SpriteSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.SpriteSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.SpriteSystem.prototype.constructor = Entitite.SpriteSystem;

Entitite.SpriteSystem.mixin({
  
  _name: 'sprite',

  initInstance: function(instance, params) {
    params = params || {};
    var sprite = params.sprite || '';
    var x = params.x || 0;
    var y = params.y || 0;
    if (params.position && params.x === undefined && params.y === undefined) {
      x = params.position.x;
      y = params.position.y;
    }
    instance.isOutOfBounds = false;
    
    instance.sprite = new Phaser.Sprite(this.game, x, y, sprite);
    instance.sprite.componentId = params.parentId;

    this.game.physics.arcade.enable(instance.sprite);

    instance.sprite.body.allowGravity = false;
    instance.sprite.body.immovable = params.immovable || false;
    instance.sprite.checkWorldBounds = true;
    
    instance.sprite.events.onOutOfBounds.add(function() {
      instance.isOutOfBounds = true;
    });

    instance.sprite.scale.x = instance.sprite.scale.y = params.scale || 1;
    instance.sprite.spriteName = sprite;
    instance.sprite.rotation = params.rotation || 0;
    instance.sprite.pivot = params.pivot || new Phaser.Point(instance.sprite.texture.width / 2, 
                                                             instance.sprite.texture.height / 2);
    instance.sprite.renderOrder = params.renderOrder || 0;

    this.game.world.add(instance.sprite);
  },

  updateInstance: function(instance) {
    if (instance.isOutOfBounds) {
      this.deleteEntityFromInstance(instance);
    }
  },

  serializeInstance: function(instance) {
    return {
      sprite: instance.sprite.spriteName,

      x: instance.sprite.x,
      y: instance.sprite.y,

      rotation: instance.sprite.rotation
    };
  },

  destroyInstance: function(instance) {
    instance.sprite.destroy();

    instance.sprite = null;
  }

});
