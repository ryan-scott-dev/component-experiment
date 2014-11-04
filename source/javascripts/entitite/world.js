Entitite.World = function(preallocatedEntityCount) {
  this.entities = new Entitite.InstanceSystem(preallocatedEntityCount);
  this.systems = new Map();

  this.templates = {};
  this.rng = new Phaser.RandomDataGenerator();
};

Entitite.World.mixin({

  registerTemplate: function(templateName, params) {
    this.templates[templateName] = params;
  },

  acquireTemplateEntity: function(templateName, params) {
    var templateParams = this.templates[templateName];
    
    if (!templateParams) {
      throw 'Unable to find template "' + templateName + '".';  
    }

    var combinedParams = $.extend({}, params, templateParams);
    return this.acquireEntity(combinedParams);
  },

  acquireEntity: function(params) {
    var entityId = this.entities.acquireInstance(params);
    var entity = this.entities.getInstance(entityId);
    entity.ref = params.ref || this.rng.uuid();

    assert(entity.components == null, "Expected the acquired instance to not have any components.");

    params.parentId = entityId;
    entity.components = this.acquireComponents(params.components, params);
    
    return entity;
  },

  releaseEntity: function(entity) {
    this.releaseComponents(entity.components);
    this.entities.releaseInstance(entity.idx);
    entity.components = null;
    entity.ref = null;
  },

  acquireComponents: function(components, params) {
    var acquiredComponents = {};
    components.forEach(function(componentName) {
      var component = this.getSystem(componentName);
      if (component) {
        acquiredComponents[componentName] = component.acquireInstance(params);
      } else {
        console.error('Unable to find registered system "' + componentName + '".')
      }
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

  findEntity: function(entityRef) {
    return this.entities.entities.find(function(entity) {
      return entity.ref = entityRef;
    });
  },

  getEntity: function(entityId) {
    return this.entities.getInstance(entityId); 
  },

  getSystem: function(name) {
    return this.systems.get(name);
  },

  registerSystem: function(system) {
    this.systems.set(system._name, system);
  },

  deserialize: function(state) {
    state.systems = state.systems || {};
    for (var systemName in state.systems) {
      this.getSystem(systemName).deserialize(state.systems[systemName]);
    }

    state.entities = state.entities || {};
    this.entities.deserialize(state.entities);
  },

  serialize: function() {
    return {
      systems:  this.systemsSerialized(),
      entities: this.entities.serialize()
    };
  },

  systemsSerialized: function() {
    var serialized = {};
    this.systems.forEach(function(system, name) {
      serialized[name] = system.serialize();
    });
    return serialized;
  },

  update: function() {
    this.systems.forEach(function(system) {
      system.update();
    });
  },

  getSystemEntity: function(system, entity) {
    return this.getSystem(system).getInstance(entity.components[system]);
  }

});
