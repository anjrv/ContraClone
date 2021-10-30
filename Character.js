// ==========
// SHIP STUFF
// ==========

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Character(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);

  this.rememberResets();

  // Default sprite, if not otherwise specified
  this.sprite = this.sprite;

  // Set normal drawing scale, and warp state off
  this._scale = 1;
  this._isWarping = false;

  // Variables for generalized spritesheet navigation
  // SpriteSheetBegin
  this.ssbX = this.ssbX;
  this.ssbY = this.ssbY;

  // SpriteWidth, SpiteHeight & Number of used sprites in sheet
  this.spriteWidth = this.spriteWidth;
  this.spriteHeight = this.spriteHeight;
  this.spriteNumber = this.spriteNumber;
  this.spritePosition = this.spritePosition;
  this.floor = this.floor;
  this.spriteScale = this.spriteScale;
  this.direction = this.direction;
}

Character.prototype = new Entity();

Character.prototype.rememberResets = function () {
  // Remember my reset positions
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
};

// Initial, inheritable, default values
Character.prototype.cx = 200;
Character.prototype.cy = 200;
Character.prototype.velX = 0;
Character.prototype.velY = 0;
Character.prototype.launchVel = 2;
Character.prototype.numSubSteps = 1;
Character.prototype.bounces = 0;
Character.prototype.onGround = false;

Character.prototype.update = function (du) {
  throw new Error(`Update function not implemented for Character`);
};

const NOMINAL_GRAVITY = 0.98;

Character.prototype.computeGravity = function () {
  return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Character.prototype.applyAccel = function (accelX, accelY, du) {
  // u = original velocity
  const oldVelX = this.velX;
  const oldVelY = this.velY;

  // v = u + at
  this.velX += accelX * du;
  this.velY += accelY * du;

  // v_ave = (u + v) / 2
  const aveVelX = (oldVelX + this.velX) / 2;
  const aveVelY = (oldVelY + this.velY) / 2;

  // Decide whether to use the average or not (average is best!)
  const intervalVelX = g_useAveVel ? aveVelX : this.velX;
  let intervalVelY = g_useAveVel ? aveVelY : this.velY;

  // s = s + v_ave * t
  const nextX = this.cx + intervalVelX * du;
  const nextY = this.cy + intervalVelY * du;


  // Collision with the floor
  // TODO: allow variable heights of the floor

  const floorHeight = 100;
  const minY = this.sprite.height / 2;
  const maxY = g_canvas.height - minY - floorHeight;

  if (this.velY < 0) this.onGround = false;
  if (nextY > maxY && !this.onGround) {
    this.onGround = true;
  }
  if (this.onGround) this.velY = 0;
  // s = s + v_ave * t
  this.cx += du * intervalVelX;
  this.cy = Math.min(maxY, du * intervalVelY + this.cy);
};

// TODO: change this into a rectangle hitbox
Character.prototype.getRadius = function () {
  return (this.sprite.width / 2) * 0.9;
};

Character.prototype.reset = function () {
  this.setPos(this.reset_cx, this.reset_cy);
  this.rotation = this.reset_rotation;

  this.halt();
};

Character.prototype.halt = function () {
  this.velX = 0;
  this.velY = 0;
};

Character.prototype.render = function (ctx) {
  const origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  this.sprite.scale = this._scale;
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, 0, this);
  this.sprite.scale = origScale;
};
