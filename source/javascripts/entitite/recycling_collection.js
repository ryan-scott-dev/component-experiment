Entitite.RecyclingCollection = function(preallocatedEntityCount) {
  preallocatedEntityCount = preallocatedEntityCount || 100;
  this.length = preallocatedEntityCount;
  
  this.freeIndexes = new Set();
  this.lastUsedIndex = 0;
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
  }

});
