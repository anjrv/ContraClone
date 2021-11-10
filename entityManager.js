/*

entityManager.js

A module which handles arbitrary entity-management for "Contra"


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

  _bullets: [],
  _enemies: [],
  _player: [],
  _deaths: [],
  _explosions: [],

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
    this._categories = [this._bullets, this._player, this._enemies, this._deaths, this._explosions];
  },

  init: function () {
    this._player.push(new Player({}));
  },

  getPlayer: function () {
    return this._player[0];
  },

  spawnEnemy: function (type, cx, cy, velX = 0, velY = 0) {
    switch (type) {
      case '1':
        const patrol = new Patrol({
          cx: cx,
          cy: cy,
          velX: velX,
          velY: velY,
        });
        this._enemies.push(patrol);
        break;
    }
  },

  firePlayerBullet: function (cx, cy, velX, velY, rotation) {
    const bullet = new Bullet({
      cx: cx,
      cy: cy,
      velX: velX,
      velY: velY,
      rotation: rotation,
      owner: 0,
      anim: 'LASER',
    });
    this._bullets.push(bullet);
  },

  fireEnemyBullet: function (cx, cy, velX, velY, rotation) {
    const bullet = new Bullet({
      cx: cx,
      cy: cy,
      velX: velX,
      velY: velY,
      rotation: rotation,
      owner: 1,
      anim: 'PLASMA',
    });

    this._bullets.push(bullet);
  },

  makeEnemyKillAnimation: function (cx, cy, sprite, height) {
    const death = new Death({
      cx: cx,
      cy: cy,
      sprite: sprite,
      height: height,
    });

    this._deaths.push(death);
  },

  createExplosion: function (cx, cy, size) {
    m_explosion.play();
    const explosion = new Explosion({
      cx: cx,
      cy: cy,
      sprite: g_sprites.explosion,
      size: size,
    });

    this._explosions.push(explosion);
  },

  update: function (du) {
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

  wipeEntities: function () {
    this._player = [];
    this._bullets = [];
    this._enemies = [];
    for (let c = 0; c < this._categories.length; c++) {
      this._categories[c] = [];
    }
  },

  // takes in root and appends entities object to it that carries all the information
  // the entity manager needs to restore the game state.
  recordEntities: function (root) {
    for (let c = 0; c < this._categories.length; c++) {
      let category = this._categories[c];
      for (let i = 0; i < category.length; i++) {
        let entity = category[i];
        let tag = document.createElement('entity');
        let entityRecord = entity.record(tag);

        root.appendChild(entityRecord);
      }
    }
  },

  // takes a xml/json object from recordEntities and restores the game state.
  restoreEntities: function (entities) {
    this.wipeEntities();

    let entitiesList = entities.getElementsByTagName('entity');
    for (let i = 0; i < entitiesList.length; i++) {
      let e = entitiesList[i];
      let type = e.attributes.type.nodeValue;

      if (type === Bullet.name) {
        let descr = Bullet.parseRecord(e);
        this._bullets.push(new Bullet(descr));
      } else if (type === Player.name) {
        let descr = Player.parseRecord(e);
        this._player.push(new Player(descr));
      } else if (type === Patrol.name) {
        let descr = Patrol.parseRecord(e);
        this._enemies.push(new Patrol(descr));
      }
    }
    this._categories = [this._player, this._bullets, this._enemies];
  },
};

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
