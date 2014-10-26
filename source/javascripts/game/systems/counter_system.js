Entitite.CounterSystem = function(preallocatedInstanceCount) {
  Entitite.InstanceSystem.call(this, preallocatedInstanceCount);
};

Entitite.CounterSystem.prototype = Object.create(Entitite.InstanceSystem.prototype);
Entitite.CounterSystem.prototype.constructor = Entitite.CounterSystem;

Entitite.CounterSystem.mixin({
  
  _name: 'counter',

  initInstance: function(instance, params) {
    instance.count = params.count || 0;
  },

  updateInstance: function(instance) {
    instance.count += 1;
  }

});
