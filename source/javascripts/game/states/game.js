Entitite.Game = function (game) {
};

Entitite.Game.prototype = {

  create: function () {

    this.stage.smoothed = false;
    this.stage.backgroundColor = '#1A1A1A';

    this.entititeWorld = new Entitite.World();
    this.entititeWorld.registerSystem(new Entitite.SpriteSystem(this));

    this.entititeWorld.acquireEntity({
      components: ['sprite'],

      sprite: 'preloaderBar'
    });
  },

  update: function() {
    this.entititeWorld.update();
  }

};
