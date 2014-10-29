Entitite.InstanceSystem = function(params) {
  this.entities = new Entitite.RecyclingCollection(params);
};

Entitite.InstanceSystem.mixin({
  
  _name: 'unknown',

  acquireInstance: function(params) {
    var instance = this.entities.acquire(this.onInstanceAcquired.bind(this));
    instance.parentId = params.parentId;

    var instanceId = instance.idx;
    this.initInstance(instance, params);
    return instanceId;
  },

  onInstanceAcquired: function(instance, index) {
    instance.idx = index;
    instance.alive = true;
  },

  releaseInstance: function(index) {
    var entity = this.entities.getValue(index);
    entity.alive = false;
    this.destroyInstance(entity);

    this.entities.release(index);
  },

  // RS: COULD be further optimised to only iterate up-to the last used index of the recycling collection
  update: function() {
    this.entities.forEach(this.baseUpdateInstance.bind(this));
  },

  serialize: function() {
    return {
      name: this._name,
      entities: this.entities.serialize(this.serializeInstanceCore.bind(this))
    };
  },

  deserialize: function(state) {
    state.entities = state.entities || [];
    this.entities.deserialize(state.entities, this.initInstance.bind(this));
  },

  getInstance: function(index) {
    return this.entities.getValue(index);
  },

  initInstance: function(instance, params) {
  },

  baseUpdateInstance: function(instance) {
    if (instance && instance.alive) {
      this.updateInstance(instance);
    }
  },

  updateInstance: function(instance) {
  },

  destroyInstance: function(instance) {
  },
  
  serializeInstanceCore: function(instance) {
    var coreProperties = {
      idx: instance.idx,
      alive: instance.alive
    };
    var implementationProperties = this.serializeInstance(instance);
    return $.extend({}, coreProperties, implementationProperties);
  },

  serializeInstance: function(instance) {
    return {
      idx: instance.idx,
      alive: instance.alive
    };
  }

});
