Entitite.Boot = function (game) {
};

Entitite.Boot.prototype = {

    preload: function () {
        this.load.image('preloaderBar', 'assets/preload.png');
    },

    create: function () {

        this.input.maxPointers = 1;

        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(false, true);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');
    },

    gameResized: function (width, height) {
    },

    enterIncorrectOrientation: function () {
        Entitite.orientated = false;

        // document.getElementById('orientation').style.display = 'block';
    },

    leaveIncorrectOrientation: function () {
        Entitite.orientated = true;

        // document.getElementById('orientation').style.display = 'none';
    }

};
