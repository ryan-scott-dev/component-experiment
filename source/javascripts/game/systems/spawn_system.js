Entitite.SpawnSystem = function(game, params) {
  Entitite.GameSystem.call(this, game, params);
};

Entitite.SpawnSystem.prototype = Object.create(Entitite.GameSystem.prototype);
Entitite.SpawnSystem.prototype.constructor = Entitite.SpawnSystem;

Entitite.SpawnSystem.mixin({
  
  _name: 'spawn',

  initInstance: function(instance, params) {
    instance.spawnTimer  = params.spawnTimer || 0;
    instance.spawnRate   = params.spawnRate || 0;
    instance.spawnOrder  = params.spawnOrder || [];
    instance.spawnRatios = params.spawnRatios || {};
    instance.spawnTeam   = params.team;

    if (instance.spawnOrder.length == 0) {
      this.seedSpawnOrder(instance);
    }
  },

  updateInstance: function(instance) {
    instance.spawnTimer += this.game.time.elapsed * 0.001;

    if (instance.spawnTimer > instance.spawnRate) {
      instance.spawnTimer = 0;

      var spawnTemplate = this.pluckSpawnTemplate(instance);
      var sprite = this.getSystemInstanceFromInstance('sprite', instance);
      var spawnPosition = sprite.sprite.position;
      var spawnRotation = sprite.sprite.rotation;
      
      console.log('Attempted to spawn a "' + spawnTemplate + 
        '" for team "' + instance.spawnTeam + 
        '", at position "' + spawnPosition.toString() + '".' );
    }
  },

  pluckSpawnTemplate: function(instance) {
    if (instance.spawnOrder.length == 0) {
      this.seedSpawnOrder(instance);
    }
    return instance.spawnOrder.pop();
  },

  seedSpawnOrder: function(instance) {
    var newSpawnOrder = [];
    for (var spawnTemplate in instance.spawnRatios) {
      var templateSpawns = [];
      var spawnChance = instance.spawnRatios[spawnTemplate];
      templateSpawns.length = spawnChance;
      templateSpawns.fill(spawnTemplate);
      newSpawnOrder = newSpawnOrder.concat(templateSpawns);
    }

    instance.spawnOrder = chance.shuffle(newSpawnOrder);
  },

  serializeInstance: function(instance) {
    return {
      spawnTimer:  instance.spawnTimer,
      spawnOrder:  instance.spawnOrder
    };
  },

});
