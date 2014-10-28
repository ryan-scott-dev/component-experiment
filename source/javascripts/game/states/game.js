Entitite.Game = function (game) {
};

Entitite.Game.prototype = {

  create: function () {

    this.stage.smoothed = false;
    this.stage.backgroundColor = '#1A1A1A';

    this.entititeWorld = new Entitite.World();
    this.entititeWorld.registerSystem(new Entitite.SpriteSystem(this));
    this.entititeWorld.registerSystem(new Entitite.HealthSystem(this));
    this.entititeWorld.registerSystem(new Entitite.SpawnSystem(this));

    this.entititeWorld.registerTemplate('base', {
      components: ['sprite', 'health', 'spawn'],
      health: 400,
      
      spawnRatios: {
        figher:   60,
        bomber:   30,
        engineer: 10,
      },

      spawnRate: 10
    });

    this.entititeWorld.registerTemplate('fighter', {
      components: ['sprite', 'health', 'fly', 'target', 'attack'],
      health: 50,

      speed: 5,
      
      targetPreferences: {
        base:     10,
        fighter:  30,
        bomber:   30,
        engineer: 30
      },

      attackRate: 1,
      attackType: 'fighter_attack'
    });

    this.entititeWorld.registerTemplate('bomber', {
      components: ['sprite', 'health', 'fly', 'target', 'attack'],
      health: 100,

      speed: 1,
      
      targetPreferences: {
        base:     75,
        fighter:  5,
        bomber:   5,
        engineer: 5
      },

      attackRate: 3,
      attackType: 'bomber_attack'
    });

    this.entititeWorld.registerTemplate('engineer', {
      components: ['sprite', 'health', 'fly', 'target', 'attack'],
      health: 80,

      speed: 3,

      targetPreferences: {
        base:     30,
        fighter:  30,
        bomber:   30,
        engineer: 10
      },

      attackRate: 3,
      attackType: 'engineer_attack'
    });

    this.entititeWorld.registerTemplate('fighter_attack', {
      components: ['sprite', 'projectile', 'damages'],
      sprite: 'fighter_attack',
      damageLookup: {
        base:     0.1,
        fighter:  1,
        bomber:   1,
        engineer: 1
      },
    });

    this.entititeWorld.registerTemplate('bomber_attack', {
      components: ['sprite', 'projectile', 'damages'],
      sprite: 'bomber_attack',
      damageLookup: {
        base:     3,
        fighter:  0.5,
        bomber:   0.5,
        engineer: 0.5
      }
    });

    this.entititeWorld.registerTemplate('engineer_attack', {
      components: ['sprite', 'projectile', 'disables'],
      sprite: 'engineer_attack',
      disableTimeLookup: {
        base:     5,
        fighter:  5,
        bomber:   5,
        engineer: 3
      }
    });

    this.loadState();

    if (this.entititeWorld.entities.countOfAliveEntities() == 0) {

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

};
