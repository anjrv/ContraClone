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

  // _rocks: [],
     _bullets: [],
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
    this._categories = [this._player, this._bullets];
  },

  init: function () {
    this._player.push(new Player({ }));
  },

  firePlayerBullet: function (cx, cy, velX, velY, dirX, dirY, yDir, sV,sH,sDU,sDD) {
     this._bullets.push(
       new Bullet({
         cx: cx,
         cy: cy,
         velX: velX,
         velY: velY,
         dirX: dirX,
         dirY: dirY,
         yDir: yDir,
         shootV: sV,
         shootH: sH,
         shootDU: sDU,
         shootDD: sDD
       }),
     );
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
        let pos = entity.getPos();
        let velX = entity.velX;
        let velY = entity.velY;
        let type = entity.constructor.name;
        let record = document.createElement('entity');
        record.setAttribute('type', type);
        record.setAttribute('posx', pos.posX);
        record.setAttribute('posy', pos.posY);
        record.setAttribute('velx', velX);
        record.setAttribute('vely', velY);
        root.appendChild(record);
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
      let posX = Number.parseFloat(e.attributes.posx.nodeValue);
      let posY = Number.parseFloat(e.attributes.posy.nodeValue);
      let velX = Number.parseFloat(e.attributes.velx.nodeValue);
      let velY = Number.parseFloat(e.attributes.vely.nodeValue);
      if (type === Player.name) {
        let descr = {
          cx: posX,
          cy: posY,
          velX, 
          velY
        }
        this._player.push(new Player(descr));
      }
    }
    this._categories = [this._player, this._bullets];
  }
};

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
