/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/

'use strict';

// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/

const entityManager = {
  // "PRIVATE" DATA

  // _rocks: [],
  // _bullets: [],
  // _ships: [],

  // _bShowRocks: true,
  _player: [],

  // "PRIVATE" METHODS

  _forEachOf: function (aCategory, fn) {
    for (let i = 0; i < aCategory.length; ++i) {
      fn.call(aCategory[i]);
    }
  },

  // PUBLIC METHODS

  // A special return value, used by other objects,
  // to request the blessed release of death!
  //
  KILL_ME_NOW: -1,

  // Some things must be deferred until after initial construction
  // i.e. thing which need `this` to be defined.
  //
  deferredSetup: function () {
    // this._categories = [this._rocks, this._bullets, this._ships];
    this._categories = [this._player];
  },

  init: function () {
    this._player.push(new Player({}));
    this._background = new Background();
  },

  fireBullet: function (cx, cy, velX, velY, rotation) {
    // this._bullets.push(
    //   new Bullet({
    //     cx: cx,
    //     cy: cy,
    //     velX: velX,
    //     velY: velY,

    //     rotation: rotation,
    //   }),
    // );
  },


  update: function (du) {
    this._background.update(du);
    for (let c = 0; c < this._categories.length; ++c) {
      const aCategory = this._categories[c];
      let i = 0;

      while (i < aCategory.length) {
        const status = aCategory[i].update(du);

        if (status === this.KILL_ME_NOW) {
          // remove the dead guy, and shuffle the others down to
          // prevent a confusing gap from appearing in the array
          aCategory.splice(i, 1);
        } else {
          ++i;
        }
      }
    }

  },

  render: function (ctx) {
    this._background.render(ctx);
    let debugX = 10,
      debugY = 100;

    for (let c = 0; c < this._categories.length; ++c) {
      const aCategory = this._categories[c];

      for (let i = 0; i < aCategory.length; ++i) {
        aCategory[i].render(ctx);
        //debug.text(".", debugX + i * 10, debugY);
      }
      debugY += 10;
    }
  },
};

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
