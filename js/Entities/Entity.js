// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

*/

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

function Entity() {
  /*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
*/
}

Entity.prototype.setup = function (descr) {
  // Apply all setup properies from the (optional) descriptor
  for (const property in descr) {
    this[property] = descr[property];
  }

  // Get my (unique) spatial ID
  this._spatialID = spatialManager.getNewSpatialID();

  // I am not dead yet!
  this._isDeadNow = false;
};

Entity.prototype.setPos = function (cx, cy) {
  this.cx = cx;
  this.cy = cy;
};

Entity.prototype.getPos = function () {
  return { posX: this.cx, posY: this.cy };
};

Entity.prototype.getRadius = function () {
  return 0;
};

Entity.prototype.getSpatialID = function () {
  return this._spatialID;
};

Entity.prototype.kill = function () {
  this._isDeadNow = true;
};

Entity.prototype.findHitEntity = function () {
  if (!this.collider) return null;
  return spatialManager.findEntityInRange(this.collider);
};

// This is just little "convenience wrapper"
Entity.prototype.isColliding = function () {
  return this.findHitEntity();
};

Entity.prototype.wrapPosition = function () {
  this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
  this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};

// Records variables needed to restore Entity
Entity.prototype.record = function (tag) {
  throw new Error(
    `record function not implemented for ${this.constructor.name}`,
  );
};

// Parses a xml record and returns object to be passed into constructor
Entity.prototype.parseRecord = function (record) {
  throw new Error(
    `parseRecord function is not implemented for ${this.constructor.name}`,
  );
};
