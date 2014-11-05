//= require game/systems/game_system

Entitite.DisabilitySystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.DisabilitySystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.DisabilitySystem.prototype.constructor = Entitite.DisabilitySystem;

Entitite.DisabilitySystem.mixin({
  
  _name: 'disability',

  initInstance: function(instance, params) {
    instance.disabled = params.disabled || false;
    instance.timeDisabled = params.timeDisabled || 0;
  },

  updateInstance: function(instance) {
    if (instance.disabled) {
      instance.timeDisabled += this.game.time.elapsed;

      if (instance.timeDisabled >= instance.disabled) {
        instance.disabled = 0;
        instance.timeDisabled = 0;
      }  
    }
  },

  destroyInstance: function(instance) {
    instance.disabled = null;
    instance.timeDisabled = null;
  }

});
