Entitite.Game = function (game) {
};

Entitite.Game.prototype = {

  create: function () {

    this.stage.smoothed = false;
    this.stage.backgroundColor = '#1A1A1A';

    this.entititeWorld = new Entitite.World();
    this.entititeWorld.registerSystem(new Entitite.SpriteSystem(this));

    this.loadState();

    if (this.entititeWorld.entities.countOfAliveEntities() == 0) {

      this.entititeWorld.acquireEntity({
        components: ['sprite'],

        sprite: 'preloaderBar',

        x: 100,
        y: 100,
      });

      this.entititeWorld.acquireEntity({
        components: ['sprite'],

        sprite: 'preloaderBar',

        x: 200,
        y: 200,
      });

      this.entititeWorld.acquireEntity({
        components: ['sprite'],

        sprite: 'preloaderBar',

        x: 300,
        y: 300,
      });

      this.saveState();
    }
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
