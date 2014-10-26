Entitite.InstanceSystem = function(preallocatedInstanceCount) {
  this.entities = new Entitite.RecyclingCollection(preallocatedInstanceCount);
};

Entitite.InstanceSystem.mixin({
  
  _name: 'unknown',

  acquireInstance: function(params) {
    var instance = this.entities.acquire(this.onInstanceAcquired.bind(this));
    var instanceId = instance.idx;
    this.initInstance(instance, params);
    return instanceId;
  },

  onInstanceAcquired: function(instance, index) {
    instance.idx = index;
    instance.alive = true;
  },

  releaseInstance: function(index) {
    this.entities[index].alive = false;
    this.entities.release(index);
  },

  aliveEntities: function() {
    return this.entities.filter(function(e) { return e.alive; });
  },

  update: function() {
    this.aliveEntities().forEach(this.updateInstance.bind(this));
  },

  getInstance: function(index) {
    return this.entities[index];
  },

  initInstance: function(instance, params) {
  },

  updateInstance: function(instance) {
  }

});
