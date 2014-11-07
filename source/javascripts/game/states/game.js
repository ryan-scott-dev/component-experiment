Entitite.Game = function (game) {
};

Entitite.Game.prototype = {

  create: function () {

    this.stage.smoothed = true;
    this.stage.backgroundColor = '#1A1A1A';

    this.game.world.setBounds(-1000, -1000, 4000, 4000);
    this.game.camera.focusOnXY(150, 250);

    this.entititeWorld = new Entitite.World();

    /* Everything depends on this :( */
    this.entititeWorld.registerSystem(new Entitite.SpriteSystem(this));

    this.entititeWorld.registerSystem(new Entitite.SpawnSystem(this));
    this.entititeWorld.registerSystem(new Entitite.RotateSystem(this));
    this.entititeWorld.registerSystem(new Entitite.TargetSystem(this));
    this.entititeWorld.registerSystem(new Entitite.FlySystem(this));
    
    this.entititeWorld.registerSystem(new Entitite.TeamSystem(this));
    this.entititeWorld.registerSystem(new Entitite.AttackSystem(this));
    
    this.entititeWorld.registerSystem(new Entitite.ProjectileSystem(this));
    this.entititeWorld.registerSystem(new Entitite.CollisionSystem(this));

    this.entititeWorld.registerSystem(new Entitite.DamageSystem(this));
    this.entititeWorld.registerSystem(new Entitite.DisableSystem(this));

    /* After collision / attack resolution */
    this.entititeWorld.registerSystem(new Entitite.DisabilitySystem(this));
    this.entititeWorld.registerSystem(new Entitite.HealthSystem(this));
    this.entititeWorld.registerSystem(new Entitite.LifespanSystem(this));

    this.entititeWorld.registerTemplates(Entitite.Config.Templates);

    this.createBase({ team: 'green',  x: 0,  y: 100  });
    this.createBase({ team: 'blue',   x: 300, y: 100 });
    this.createBase({ team: 'red',    x: 0,  y: 400  });
    this.createBase({ team: 'orange', x: 300, y: 400 });
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

    this.updateCamera();
  },

  updateCamera: function() { 
    this.dragCameraTowardPointer(this.input.activePointer);
  },

  dragCameraTowardPointer: function(pointer) {
    if (pointer.isDown) {
        if (this.lastPointerPosition) {
            this.game.camera.x += this.lastPointerPosition.x - pointer.position.x;
            this.game.camera.y += this.lastPointerPosition.y - pointer.position.y;
        }
        this.lastPointerPosition = pointer.position.clone();
    }
    if (pointer.isUp) { this.lastPointerPosition = null; }
  }

};
