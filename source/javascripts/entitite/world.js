Entitite.World = function(preallocatedEntityCount) {
  this.entities = new Entitite.InstanceSystem(preallocatedEntityCount);
  this.systems = new Map();

  this.rng = new Phaser.RandomDataGenerator();
};

Entitite.World.mixin({

  acquireEntity: function(params) {
    var entityId = this.entities.acquireInstance(params);
    var entity = this.entities.getInstance(entityId);
    entity.components = this.acquireComponents(params.components, params);
    
    entity.ref = params.ref || this.rng.uuid();

    return entity;
  },

  releaseEntity: function(entityId) {
    var entity = this.entities.getInstance(entityId);
    this.releaseComponents(entity.components);
    this.entities.releaseInstance(entityId);
  },

  acquireComponents: function(components, params) {
    var acquiredComponents = {};
    components.map(function(componentName) {
      return this.getSystem(componentName);
    }, this).forEach(function(component) {
      acquiredComponents[component._name] = component.acquireInstance(params);
    }, this);
    return acquiredComponents;
  },

  releaseComponents: function(components) {
    for (var component in components) {
      var index = components[component];
      this.getSystem(component).releaseInstance(index); 
    }
    return components;
  },

  getSystem: function(name) {
    return this.systems.get(name);
  },

  registerSystem: function(system) {
    this.systems.set(system._name, system);
  },


  update: function() {
    this.systems.forEach(function(system) {
      system.update();
    });
  },

});
