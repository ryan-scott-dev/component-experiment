Entitite.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

Entitite.Preloader.prototype = {

  preload: function () {
    this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('base_yellow', '/assets/base_yellow.png');
    this.load.image('base_red',    '/assets/base_red.png');
    this.load.image('base_green',  '/assets/base_green.png');
    this.load.image('base_blue',   '/assets/base_blue.png');
  },

  create: function () {

    this.preloadBar.cropEnabled = false;

    this.state.start('Game');

    $('body').addClass('loaded');
  },

  update: function () {
  }

};
