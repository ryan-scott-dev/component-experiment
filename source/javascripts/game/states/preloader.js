Entitite.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

Entitite.Preloader.prototype = {

  preload: function () {
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);

    // this.load.image('base_orange', 'development_assets/base_orange.png');
    // this.load.image('base_red',    'development_assets/base_red.png');
    // this.load.image('base_green',  'development_assets/base_green.png');
    // this.load.image('base_blue',   'development_assets/base_blue.png');

    // this.load.image('bomber_attack', 'development_assets/bomber_attack.png');
    // this.load.image('bomber_blue',   'development_assets/bomber_blue.png');
    // this.load.image('bomber_green',  'development_assets/bomber_green.png');
    // this.load.image('bomber_red',    'development_assets/bomber_red.png');
    // this.load.image('bomber_orange', 'development_assets/bomber_orange.png');

    // this.load.image('fighter_attack', 'development_assets/fighter_attack.png');
    // this.load.image('fighter_blue',   'development_assets/fighter_blue.png');
    // this.load.image('fighter_green',  'development_assets/fighter_green.png');
    // this.load.image('fighter_red',    'development_assets/fighter_red.png');
    // this.load.image('fighter_orange', 'development_assets/fighter_orange.png');

    // this.load.image('engineer_attack', 'development_assets/engineer_attack.png');
    // this.load.image('engineer_blue',   'development_assets/engineer_blue.png');
    // this.load.image('engineer_green',  'development_assets/engineer_green.png');
    // this.load.image('engineer_red',    'development_assets/engineer_red.png');
    // this.load.image('engineer_orange', 'development_assets/engineer_orange.png');

    this.load.atlas('base-atlas', 'assets/atlas.png', 'assets/atlas.json');
  },

  create: function () {
    var tween = this.add.tween(this.preloadBar)
      .to({
        alpha: 0
      }, 600, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.showGame, this);
  },

  showGame: function() {
    this.state.start('Game');

    $('body').addClass('loaded');
  },

  update: function () {
  }

};
