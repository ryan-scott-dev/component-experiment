Entitite.Game = function (game) {
};

Entitite.Game.prototype = {

  create: function () {

    this.stage.smoothed = false;
    this.stage.backgroundColor = '#1A1A1A';

    this.game.world.setBounds(-1000, -1000, 4000, 4000);
    this.game.camera.position.x = 0;
    this.game.camera.position.y = 0;

    this.entititeWorld = new Entitite.World();

    /* Everything depends on this :( */
    this.entititeWorld.registerSystem(new Entitite.SpriteSystem(this));

    this.entititeWorld.registerSystem(new Entitite.SpawnSystem(this));
    this.entititeWorld.registerSystem(new Entitite.RotateSystem(this));
    this.entititeWorld.registerSystem(new Entitite.TargetSystem(this));
    this.entititeWorld.registerSystem(new Entitite.FlySystem(this));
    
    this.entititeWorld.registerSystem(new Entitite.TeamSystem(this));
    this.entititeWorld.registerSystem(new Entitite.AttackSystem(this));
    
    this.entititeWorld.registerSystem(new Entitite.ProjectileSystem(this));
    this.entititeWorld.registerSystem(new Entitite.CollisionSystem(this));

    this.entititeWorld.registerSystem(new Entitite.DamageSystem(this));
    this.entititeWorld.registerSystem(new Entitite.DisableSystem(this));

    /* After collision / attack resolution */
    this.entititeWorld.registerSystem(new Entitite.DisabilitySystem(this));
    this.entititeWorld.registerSystem(new Entitite.HealthSystem(this));
    this.entititeWorld.registerSystem(new Entitite.LifespanSystem(this));

    this.entititeWorld.registerTemplate('base', {
      name: 'base',
      collisionType: 'target',
      
      components: ['sprite', 'team', 'health', 'spawn', 'rotate', 'collision', 'disability'],
      health: 400,

      immovable: true,
      
      spawnRatios: {
        fighter:   60,
        bomber:   30,
        engineer: 10,
      },

      spawnRate: 5
    });

    this.entititeWorld.registerTemplate('fighter', {
      name: 'fighter',
      collisionType: 'target',
      
      components: ['team', 'sprite', 'health', 'fly', 'target', 'attack', 'collision', 'disability'],
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
      attackRange: 200,
      attackType: 'fighter_attack'
    });

    this.entititeWorld.registerTemplate('bomber', {
      name: 'bomber',
      collisionType: 'target',
      
      components: ['team', 'sprite', 'health', 'fly', 'target', 'attack', 'collision', 'disability'],
      health: 100,

      speed: 1,
      maxSpeed: 20,
      
      targetPreferences: {
        base:     75,
        fighter:  5,
        bomber:   5,
        engineer: 5
      },

      attackRate: 2000,
      attackRange: 200,
      attackType: 'bomber_attack'
    });

    this.entititeWorld.registerTemplate('engineer', {
      name: 'engineer',
      collisionType: 'target',

      components: ['team', 'sprite', 'health', 'fly', 'target', 'attack', 'collision', 'disability'],
      health: 80,

      speed: 3,
      maxSpeed: 40,

      targetPreferences: {
        base:     30,
        fighter:  30,
        bomber:   30,
        engineer: 10
      },

      attackRate: 2000,
      attackRange: 200,
      attackType: 'engineer_attack'
    });

    this.entititeWorld.registerTemplate('fighter_attack', {
      components: ['sprite', 'projectile', 'damage', 'collision', 'lifespan'],
      collisionType: 'projectile',

      sprite: 'fighter_attack',
      lifespan: 3000,
      speed: 100,
      maxSpeed: 300,

      damageLookup: {
        base:     0.1,
        fighter:  30,
        bomber:   30,
        engineer: 30
      },
    });

    this.entititeWorld.registerTemplate('bomber_attack', {
      components: ['sprite', 'projectile', 'damage', 'collision', 'lifespan'],
      collisionType: 'projectile',

      sprite: 'bomber_attack',
      lifespan: 3000,
      speed: 50,
      maxSpeed: 100,

      damageLookup: {
        base:     50,
        fighter:  10,
        bomber:   10,
        engineer: 10
      }
    });

    this.entititeWorld.registerTemplate('engineer_attack', {
      components: ['sprite', 'projectile', 'disable', 'collision', 'lifespan'],
      collisionType: 'projectile',

      sprite: 'engineer_attack',
      lifespan: 3000,
      speed: 50,
      maxSpeed: 500,

      disableTimeLookup: {
        base:     4000,
        fighter:  2000,
        bomber:   2000,
        engineer: 1000
      },
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

    this.updateCamera();
  },

  updateCamera: function() { 
    this.dragCameraTowardPointer(this.input.activePointer);
  },

  dragCameraTowardPointer: function(pointer) {
    if (pointer.isDown) {
        if (this.lastPointerPosition) {
            this.game.camera.x += this.lastPointerPosition.x - pointer.position.x;
            this.game.camera.y += this.lastPointerPosition.y - pointer.position.y;
        }
        this.lastPointerPosition = pointer.position.clone();
    }
    if (pointer.isUp) { this.lastPointerPosition = null; }
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
      if (teamInstance.alive && teamInstance.team !== sourceTeam) {
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

      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      if (a.distance == b.distance) return 0;
      return 10000;
    });

    if (sortedTargets.length > 0) 
      return sortedTargets[0].sprite;

    return null;
  }
};
