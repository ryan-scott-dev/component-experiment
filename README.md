# Component Experiment

An experiment with a component system to compose entity behaviour rather than inherit.

[Demo](http://ryan-scott.me/component-experiment)

Some key benefits are:
- Minimal runtime allocs
- Easily serializable/de-serializable
- Constant lookup time for components in the same entity
- Templates for a group of components
- Component recycling to prevent un-necessary allocs.

Using the framework [Phaser.io](http://phaser.io) is quite restricted in writing components that deal with position/rotation/velocity as they all need to go through the same sprite. 

## Load speed improvements

- Texture Atlas (Automateable w/ command line tools?)
- Prefetch assets + App Cache for offline access
- Clean up atlas json(remove rotated/trimmed/meta) + minify(strip whitespace)
- Minify HTML

## Sprite Export

- JSON (Array)
- Trim sprite names

## Deploy
- `middleman build`
- `middleman s3_sync`
- `middleman invalidate`

## See also

https://github.com/qiao/ces.js

http://vasir.net/blog/game-development/how-to-build-entity-component-system-in-javascript

## License

Component Experiment was created by [Ryan Scott](http://github.com/archytaus) is distributed under the [MIT](http://ryanscott.mit-license.org) license.
