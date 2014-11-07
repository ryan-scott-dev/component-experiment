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

    // this.load.image('base_orange', 'assets/base_orange.png');
    // this.load.image('base_red',    'assets/base_red.png');
    // this.load.image('base_green',  'assets/base_green.png');
    // this.load.image('base_blue',   'assets/base_blue.png');

    // this.load.image('bomber_attack', 'assets/bomber_attack.png');
    // this.load.image('bomber_blue',   'assets/bomber_blue.png');
    // this.load.image('bomber_green',  'assets/bomber_green.png');
    // this.load.image('bomber_red',    'assets/bomber_red.png');
    // this.load.image('bomber_orange', 'assets/bomber_orange.png');

    // this.load.image('fighter_attack', 'assets/fighter_attack.png');
    // this.load.image('fighter_blue',   'assets/fighter_blue.png');
    // this.load.image('fighter_green',  'assets/fighter_green.png');
    // this.load.image('fighter_red',    'assets/fighter_red.png');
    // this.load.image('fighter_orange', 'assets/fighter_orange.png');

    // this.load.image('engineer_attack', 'assets/engineer_attack.png');
    // this.load.image('engineer_blue',   'assets/engineer_blue.png');
    // this.load.image('engineer_green',  'assets/engineer_green.png');
    // this.load.image('engineer_red',    'assets/engineer_red.png');
    // this.load.image('engineer_orange', 'assets/engineer_orange.png');

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
