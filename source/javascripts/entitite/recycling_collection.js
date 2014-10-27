Entitite.RecyclingCollection = function(params) {
  params = params || {};
  this.length = params.length || 100;
  
  this.freeIndexes = new Set(params.freeIndexes);
  this.lastUsedIndex = params.lastUsedIndex || 0;
  var values = params.values || [];
  for (var i = 0; i < values.length; i++) {
    this[i] = values[i];
  }
};

Entitite.RecyclingCollection.prototype = Object.create(Array.prototype);
Entitite.RecyclingCollection.prototype.constructor = Entitite.RecyclingCollection;

Entitite.RecyclingCollection.mixin({
  
  acquire: function(callback, defaultValue) {
    defaultValue = defaultValue || {};
    var index = this.recycleIndex();
    if (index === undefined) {
      index = this.lastUsedIndex++;  
    }
  
    var value = this[index] = this[index] || defaultValue;
    if (callback) {
      callback(value, index);
    }
    
    return value;
  },

  recycleIndex: function() {
    var iterator = this.freeIndexes.values().next();
    return iterator.value;
  },

  release: function(entityIndex) {
    this.freeIndexes.add(entityIndex);
  },

  serialize: function(entitySerialize) {
    return {
      length: this.length,
      values: this.map(entitySerialize),
      lastUsedIndex: this.lastUsedIndex,
      freeIndexes: this.serializeFreeIndexes()
    };
  },

  serializeFreeIndexes: function() {
    var indexes = [];
    var iterator = this.freeIndexes.forEach(function(value) {
      indexes.push(value);
    });
    
    return indexes;
  }

});
