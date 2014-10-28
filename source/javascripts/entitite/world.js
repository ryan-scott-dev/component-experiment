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
    entity.components = this.acquireComponents(params.components, params);
    
    entity.ref = params.ref || this.rng.uuid();

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

  /* 😟 */
  deleteEntity: function(system, system_instance) {
    var entity = this.entities.aliveEntities().find(function(entity) {
      return entity.components && entity.components[system] == system_instance;
    });
    this.releaseEntity(entity);
    return entity;
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

});
