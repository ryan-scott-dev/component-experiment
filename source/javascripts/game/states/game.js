Entitite.Game = function (game) {
};

Entitite.Game.prototype = {

  create: function () {

    this.stage.smoothed = false;
    this.stage.backgroundColor = '#1A1A1A';

    this.entititeWorld = new Entitite.World();
    this.entititeWorld.registerSystem(new Entitite.SpriteSystem(this));
    this.entititeWorld.registerSystem(new Entitite.PhysicsSystem(this));
    this.entititeWorld.registerSystem(new Entitite.HealthSystem(this));
    this.entititeWorld.registerSystem(new Entitite.SpawnSystem(this));
    this.entititeWorld.registerSystem(new Entitite.RotateSystem(this));
    this.entititeWorld.registerSystem(new Entitite.TargetSystem(this));
    this.entititeWorld.registerSystem(new Entitite.FlySystem(this));
    this.entititeWorld.registerSystem(new Entitite.TeamSystem(this));
    this.entititeWorld.registerSystem(new Entitite.AttackSystem(this));
    this.entititeWorld.registerSystem(new Entitite.LifespanSystem(this));

    this.entititeWorld.registerTemplate('base', {
      name: 'base',
      
      components: ['sprite', 'team', 'health', 'spawn', 'rotate'],
      health: 400,
      
      spawnRatios: {
        fighter:   60,
        bomber:   30,
        engineer: 10,
      },

      spawnRate: 5
    });

    this.entititeWorld.registerTemplate('fighter', {
      name: 'fighter',
      
      components: ['physics', 'team', 'sprite', 'health', 'fly', 'target', 'attack'],
      health: 50,

      speed: 5,
      maxSpeed: 30,
      
      targetPreferences: {
        base:     10,
        fighter:  30,
        bomber:   30,
        engineer: 30
      },

      attackRate: 1000,
      attackRange: 100,
      attackType: 'fighter_attack'
    });

    this.entititeWorld.registerTemplate('bomber', {
      name: 'bomber',
      
      components: ['physics', 'team', 'sprite', 'health', 'fly', 'target', 'attack'],
      health: 100,

      speed: 1,
      maxSpeed: 20,
      
      targetPreferences: {
        base:     75,
        fighter:  5,
        bomber:   5,
        engineer: 5
      },

      attackRate: 3000,
      attackRange: 200,
      attackType: 'bomber_attack'
    });

    this.entititeWorld.registerTemplate('engineer', {
      name: 'engineer',

      components: ['physics', 'team', 'sprite', 'health', 'fly', 'target', 'attack'],
      health: 80,

      speed: 3,
      maxSpeed: 40,

      targetPreferences: {
        base:     30,
        fighter:  30,
        bomber:   30,
        engineer: 10
      },

      attackRate: 3000,
      attackRange: 200,
      attackType: 'engineer_attack'
    });

    this.entititeWorld.registerTemplate('fighter_attack', {
      components: ['sprite', 'projectile', 'damages', 'lifespan'],
      sprite: 'fighter_attack',
      lifespan: 3000,
      damageLookup: {
        base:     0.1,
        fighter:  1,
        bomber:   1,
        engineer: 1
      },
    });

    this.entititeWorld.registerTemplate('bomber_attack', {
      components: ['sprite', 'projectile', 'damages', 'lifespan'],
      sprite: 'bomber_attack',
      lifespan: 3000,
      damageLookup: {
        base:     3,
        fighter:  0.5,
        bomber:   0.5,
        engineer: 0.5
      }
    });

    this.entititeWorld.registerTemplate('engineer_attack', {
      components: ['sprite', 'projectile', 'disables', 'lifespan'],
      sprite: 'engineer_attack',
      lifespan: 3000,
      disableTimeLookup: {
        base:     5,
        fighter:  5,
        bomber:   5,
        engineer: 3
      }
    });

    this.loadState();


    // If there was a state to load
    if (true) {

      this.createBase({ team: 'green',  x: 100,  y: 100  });
      this.createBase({ team: 'blue',   x: 1200, y: 100 });
      this.createBase({ team: 'red',    x: 100,  y: 400  });
      this.createBase({ team: 'orange', x: 1200, y: 400 });

      // this.saveState();
    }
  },

  createBase: function(params) {
    this.createTemplateEntity('base', {
      team: params.team,
      sprite: 'base_' + params.team,

      x: params.x,
      y: params.y,
    });
  },

  createTemplateEntity: function(template, params) {
    this.entititeWorld.acquireTemplateEntity(template, params);
  },

  update: function() {
    this.entititeWorld.update();
  },

  loadState: function() {
    console.time('loadState');
    var state = JSON.parse(localStorage.getItem('game.state'));
    this.fromGameState(state || {});
    console.timeEnd('loadState');
  },

  saveState: function() {
    console.time('saveState');
    var state = this.gameState();
    localStorage.setItem('game.state', JSON.stringify(state));
    console.timeEnd('saveState');
  },

  gameState: function() {
    return {
      world: this.entititeWorld.serialize()
    }
  },

  fromGameState: function(state) {
    state.world = state.world || [];

    this.entititeWorld.deserialize(state.world);
  },

  findTargetForPreferences: function(sprite, preferences, sourceTeam) {
    var teamSystem = this.entititeWorld.getSystem('team');
    var spriteSystem = this.entititeWorld.getSystem('sprite');

    var nearbyTargets = [];

    // Find nearby entities not of the source team
    teamSystem.forEach(function(teamInstance) { 
      if (teamInstance.team !== sourceTeam) {
        var entityId = teamInstance.parentId;
        var entity = this.entititeWorld.getEntity(entityId);
        var entitySprite = this.entititeWorld.getSystemEntity('sprite', entity);
        var type = entity.name;

        // Calculate distance
        var distance = sprite.position.distance(entitySprite.sprite.position);
        
        // Store sprite id mapped to distance
        nearbyTargets.push({ sprite: entitySprite.sprite, position: entitySprite.sprite.position, distance: distance, type: type });
      }
    }.bind(this));

    // Sorted by preferences * distance
    sortedTargets = nearbyTargets.sort(function(a, b) {
      var diff = Math.abs(b.distance - a.distance);
      if (diff < 400) {
        if (preferences[a.type] < preferences[b.type]) return 1;
        if (preferences[a.type] > preferences[b.type]) return -1;
        return 0;
      }
      // If distance difference is between a range * preferences
        // Sort by preferences
      // Else
        // Sort by distance
      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      if (a.distance == b.distance) return 0;
      return 10000;
    });

    // console.log(sortedTargets);
    
    return sortedTargets[0].sprite;
  }
};
