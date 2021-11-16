/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

const spatialManager = {
  // "PRIVATE" DATA

  _nextSpatialID: 1,

  _entities: [],

  // PUBLIC METHODS

  getNewSpatialID: function () {
    return this._nextSpatialID++;
  },

  register: function (entity) {
    const spatialID = entity.getSpatialID();
    this._entities[spatialID] = entity;
  },

  unregister: function (entity) {
    const spatialID = entity.getSpatialID();
    // it is not enough to just set this._entities[spatialID]=null
    // they still iterate over the null elements and cause performance issues
    delete this._entities[spatialID];
  },

  findEntityInRange: function (collider) {
    for (let ID in this._entities) {
      const e = this._entities[ID];

      if (e?.collider) {
        const collision = collider.collide(e.collider);
        if (collision) {
          return e;
        }
      }
    }

    return false;
  },

  render: function (ctx) {
    for (let ID in this._entities) {
      const e = this._entities[ID];
      e?.collider && e.collider.render(ctx);
    }
  },

  wipeCollisionObjects: function () {
    let i = 0;
    for (let ID in this._entities) {
      i++;
      delete this._entities[ID];
    }
  },

  wipeCollision: function () {
    this._entities = [];
  },
};
