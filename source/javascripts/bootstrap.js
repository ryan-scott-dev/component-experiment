(function () {

    var game = new Phaser.Game('100', '100', Phaser.AUTO, $('.canvas_container')[0]);

    game.state.add('Boot', Entitite.Boot);
    game.state.add('Preloader', Entitite.Preloader);
    game.state.add('Game', Entitite.Game);

    game.state.start('Boot');

})();
