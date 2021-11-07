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

  this._debug_showCollisionCells = false;
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

  let oldVelX = this.velX;
  let oldVelY = this.velY;

  // v = u + at
  this.velX += accelX * du;
  this.velY += accelY * du;
  
  let averageVelX = (this.velX + oldVelX) / 2;
  let averageVelY = (this.velY + oldVelY) / 2;

  this.cx += averageVelX * du;
  this.cy += averageVelY * du;

  this.collider.cx = this.cx;
  this.collider.cy = this.cy;
};

Character.prototype.collideWithMap2 = function (du) {
  //console.log(worldMap.getIndeciesFromCoords(this.cx, this.cy));
  //if (this.onGround) this.velY = 0;
  let gridCells = worldMap.getCollisionCells(this);
  this._debug_collisionCells = gridCells;

  let collisionCells = gridCells.filter((cell) => { return cell.content !== ' ' })

  for (let i = 0; i < collisionCells.length; i++) {
    if (this.pushOut2(collisionCells[i]) === true) break;
  }
}

Character.prototype.pushOut2 = function (cell) {
  if (cell.content === ' ') return;

  let tileSize = worldMap._tileSize;

  let charRow = worldMap.getIndeciesFromCoords(0,this.collider.cy+this.collider.offsetY).row;// Math.floor((this.collider.cy - tileSize/2) / tileSize);
  let charRow_lower = charRow - 1;// Math.floor((this.collider.cy + tileSize/2) / tileSize);
  let charRowCopy = charRow;

  let charCol = Math.floor ((this.cx + tileSize/2 )/ tileSize);

  charRow = charRowCopy;
  // Character is falling
  if (charRow < cell.row && Math.abs(charCol - cell.col) <= 0 && this.velY > 0) {
    // you can not fall on something that has something other than air on top of it
    if (worldMap.getTileType(cell.row - 1, cell.col) !== worldMap.EMPTY_TILE) return;
    this.velY = 0;
    this.cy = cell.cy 
      - tileSize/2
      - this.collider.height/2 
      - this.collider.offsetY;
    this.onGround = true;
    this.collider.cy = this.cy;
    //return;
  }

  // Character is jumping up
  if (charRow > cell.row && Math.abs(cell.col - charCol) <=0 && this.velY < 0) {
    if (worldMap._layers[0][cell.row+1][cell.col] !== ' ') return;
    this.velY = 0;
    this.cy = cell.cy 
      + this.collider.height/2
      + this.collider.offsetY;
    this.collider.cy = this.cy;
    //return true;
  }
  
  //if (this.velY < 0) charRow = null;
  // Character colliding with cell left of them
  if ((cell.row === charRow || cell.row === charRow_lower) && charCol > cell.col && this.velX < 0) {
    this.velX = 0;
    this.cx = cell.cx
      + tileSize / 2
      + this.collider.width / 2 + 1;
    this.collider.cx = this.cx;
    //return;
  }

  // Character colliding with cell right of them
  if ((cell.row === charRow || cell.row === charRow_lower) && charCol < cell.col && this.velX > 0) {
    this.velX = 0;
    this.cx = cell.cx 
      - tileSize / 2 - 1
      - this.collider.width / 2;
    this.collider.cx = this.cx;
    //return;
  }

  
}

Character.prototype.collideWithMap = function (du) {

  // Ground logic Part 1
  if (this.onGround) this.velY = 0;

  // Make grid coordinates for player
  let grid = worldMap.getGridCoords(this);
  this._grid = grid;
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
    if (x === 1) { 
      this.cx = grid[3] * tSize //+ p_realSize/1.75;
      this.velX = 0;
    }
  }

  if (!around.L) {
    if (x === -1) {
      this.cx = (grid[1]+1) * tSize;
      this.velX = 0;
    }
  }
  
  if (!around.T) {
    if (y === -1) { 
      // To be able to jump up along walls, not perfect logic yet
      //if ((around.B && around.L) || (around.B && around.R)) {
        this.cy = (grid[2]) * tSize //- p_realSize/4; 
        this.velY = 0;
      //}
    }
  }

  if (!around.B) {
    if (y === 1) {
      // To be able to jump up along walls, not perfect logic yet
      // The tradeoff is that it causes corner glitch

      // if ((around.T && around.L) || (around.T && around.R)) {
        this.cy = (grid[2]-1) * tSize - p_realSize/4;
        this.onGround = true;
        this.velY = 0;
      // }
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

  this.debugRender(ctx);
};

Character.prototype.debugRender = function (ctx) {
  if (this._debug_showCollisionCells) this._debug_RenderCollsionsCells(ctx);

}

Character.prototype._debug_RenderCollsionsCells = function (ctx) {
  if (!this._debug_collisionCells) return;

  let tileSize = worldMap._tileSize;

  for (let i = 0; i < this._debug_collisionCells.length; i++) {
    let cell = this._debug_collisionCells[i];
    util.fillBoxCentered(ctx, 
      cell.col*tileSize, 
      cell.row*tileSize,
      tileSize, tileSize,
      cell.content === ' ' ? '#fff5' : '#0f05',
      );
  }
}

Character.prototype.debugRender2 = function (ctx) {
  if (!this._grid) return;
  // top left box
  util.fillBoxCentered(ctx, this._grid[1]*worldMap._tileSize, 
    this._grid[0]*worldMap._tileSize, 
    worldMap._tileSize, worldMap._tileSize, '#00fa');
  // top right box
  util.fillBoxCentered(ctx, this._grid[3]*worldMap._tileSize, 
    this._grid[0]*worldMap._tileSize, 
    worldMap._tileSize, worldMap._tileSize, '#f00a');
  // bot left
  util.fillBoxCentered(ctx, this._grid[1]*worldMap._tileSize, 
    this._grid[2]*worldMap._tileSize, 
    worldMap._tileSize, worldMap._tileSize, '#0f05');
  util.fillBoxCentered(ctx, this._grid[3]*worldMap._tileSize, 
    this._grid[2]*worldMap._tileSize, 
    worldMap._tileSize, worldMap._tileSize, '#0ff5');

  let oldStyle = ctx.fillStyle;
  ctx.fillStyle = 'red';
  util.fillBoxCentered(ctx, this.collider.cx, this.collider.cy+this.collider.offsetY, this.collider.width, this.collider.height, '#fff8')
  util.fillCircle(ctx, this.cx, this.cy, 5);
  ctx.fillStyle = oldStyle;
}