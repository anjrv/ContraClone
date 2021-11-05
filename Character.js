// ==========
// SHIP STUFF
// ==========

"use strict";

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

  // Set normal drawing scale, and warp state off
  this._isWarping = false;
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
Character.prototype.scale = 1;

Character.prototype.update = function (du) {
  throw new Error(`Update function not implemented for Character`);
};

const NOMINAL_GRAVITY = 0.98;

Character.prototype.computeGravity = function () {
  return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Character.prototype.applyAccel = function (accelX, accelY, du, player = false) {
  if (du === 0) du = 1;

  // v = u + at
  this.velX += accelX * du;
  this.velY += accelY * du;
};

Character.prototype.collideWithMap = function (du) {

  // Ground logic Part 1
  if (this.onGround) this.velY = 0;

  // Make grid coordinates for player
  let grid = worldMap.getGridCoords(this)

  // Look at player's closest collision areas
  let around = worldMap.isAround(this);
  
  // Push out of tile if collision
  if (!around.T || !around.B || !around.L || !around.R) {
    this.pushOut(around, grid);
  }

  // Assign x coordinate
  if ((around.L && keys[this.KEY_LEFT] || around.R && keys[this.KEY_RIGHT])) {
    this.cx += du * this.velX; 
  }
  else {
    this.velX = 0;
  }
  
  // Assign y coordinate
  this.cy += du * this.velY;
  
  // Ground logic Part 2
  if (worldMap.isDrop(this)) {
    this.onGround = false;
    this.verticalCollision = false;
  }
}

Character.prototype.pushOut = function (around, grid) {
  let x = Math.sign(this.velX);
  let y = Math.sign(this.velY);
  let tSize = worldMap._tileSize;
  
  if (!around.R) {
    if (x === -1) { 
      this.cx = (grid[3]+1) * tSize - p_realSize/1.75;
      this.velX = 0;
    }
  }

  if (!around.L) {
    if (x === 1) {
      this.cx = (grid[1]+2) * tSize;
      this.velX = 0;
    }
  }
  
  if (!around.T) {
    if (y === -1) { 
      // To be able to jump up along walls, not perfect logic yet
      if ((around.B && around.L) || (around.B && around.R)) {
        this.cy = (grid[0]) * tSize + p_realSize/4; 
        this.velY = 0;
      }
    }
  }

  if (!around.B) {
    if (y === 1) {
      // To be able to jump up along walls, not perfect logic yet
      // The tradeoff is that it causes corner glitch
      if ((around.T && around.L) || (around.T && around.R)) {
        this.cy = (grid[2]+1) * tSize - p_realSize/4;
        this.onGround = true;
        this.velY = 0;
      }
    }
  }
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
  this.sprite.scale = this.scale;
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, 0, this.velX < 0);
};