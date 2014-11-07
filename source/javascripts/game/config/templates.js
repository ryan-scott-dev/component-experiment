Entitite.Config.Templates = [
   {
    name: 'base',
    collisionType: 'target',

    components: ['sprite', 'team', 'health', 'spawn', 'rotate', 'collision', 'disability'],
    health: 400,

    immovable: true,
    
    spawnRatios: {
      fighter:   60,
      bomber:   30,
      engineer: 10,
    },

    spawnRate: 5,
    spawnTimer: 5
  },

  {
    name: 'fighter',
    collisionType: 'target',
    
    components: ['team', 'sprite', 'health', 'fly', 'target', 'attack', 'collision', 'disability'],
    health: 50,

    speed: 5,
    maxSpeed: 30,
    
    targetPreferences: {
      base:     10,
      fighter:  30,
      bomber:   30,
      engineer: 30
    },

    attackRate: 1000,
    attackRange: 200,
    attackType: 'fighter_attack'
  },

  {
    name: 'bomber',
    collisionType: 'target',
    
    components: ['team', 'sprite', 'health', 'fly', 'target', 'attack', 'collision', 'disability'],
    health: 100,

    speed: 1,
    maxSpeed: 20,
    
    targetPreferences: {
      base:     75,
      fighter:  5,
      bomber:   5,
      engineer: 5
    },

    attackRate: 2000,
    attackRange: 200,
    attackType: 'bomber_attack'
  },

  {
    name: 'engineer',
    collisionType: 'target',

    components: ['team', 'sprite', 'health', 'fly', 'target', 'attack', 'collision', 'disability'],
    health: 80,

    speed: 3,
    maxSpeed: 40,

    targetPreferences: {
      base:     30,
      fighter:  30,
      bomber:   30,
      engineer: 10
    },

    attackRate: 2000,
    attackRange: 200,
    attackType: 'engineer_attack'
  },

  {
    name: 'fighter_attack',
    components: ['sprite', 'projectile', 'damage', 'collision', 'lifespan'],
    collisionType: 'projectile',

    sprite: 'fighter_attack',
    lifespan: 3000,
    speed: 100,
    maxSpeed: 300,

    damageLookup: {
      base:     0.1,
      fighter:  30,
      bomber:   30,
      engineer: 30
    },
  },

  {
    name: 'bomber_attack',
    components: ['sprite', 'projectile', 'damage', 'collision', 'lifespan'],
    collisionType: 'projectile',

    sprite: 'bomber_attack',
    lifespan: 3000,
    speed: 50,
    maxSpeed: 100,

    damageLookup: {
      base:     50,
      fighter:  10,
      bomber:   10,
      engineer: 10
    }
  },

  {
    name: 'engineer_attack',
    components: ['sprite', 'projectile', 'disable', 'collision', 'lifespan'],
    collisionType: 'projectile',

    sprite: 'engineer_attack',
    lifespan: 3000,
    speed: 50,
    maxSpeed: 500,

    disableTimeLookup: {
      base:     4000,
      fighter:  2000,
      bomber:   2000,
      engineer: 1000
    },
  }
];
