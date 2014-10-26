Entitite.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

Entitite.Preloader.prototype = {

  preload: function () {
    this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

    this.load.setPreloadSprite(this.preloadBar);
  },

  create: function () {

    this.preloadBar.cropEnabled = false;

    this.state.start('Game');

    $('body').addClass('loaded');
  },

  update: function () {
  }

};
