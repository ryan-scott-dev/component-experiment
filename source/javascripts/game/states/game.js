Entitite.Game = function (game) {
};

Entitite.Game.prototype = {

  create: function () {

    this.stage.smoothed = false;
    this.stage.backgroundColor = '#1A1A1A';

    this.entititeWorld = new Entitite.World();
    this.entititeWorld.registerSystem(new Entitite.SpriteSystem(this));
    this.entititeWorld.registerSystem(new Entitite.HealthSystem(this));
    this.entititeWorld.registerTemplate('base', {
      components: ['sprite', 'health'],
      health: 400,
    });

    this.loadState();

    if (this.entititeWorld.entities.countOfAliveEntities() == 0) {

      this.createBase({ team: 'green',  x: 100, y: 100  });
      this.createBase({ team: 'blue',   x: 1200, y: 100 });
      this.createBase({ team: 'red',    x: 100, y: 400  });
      this.createBase({ team: 'yellow', x: 1200, y: 400 });

      this.saveState();
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
