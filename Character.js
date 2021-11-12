// ==========
// Character STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

let g_char_debug_showCollisions = false;

// A generic contructor which accepts an arbitrary descriptor object
function Character(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);

  this.rememberResets();

  // Set normal drawing scale, and warp state off
  this._isWarping = false;
  this.shotId = 1;
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

// Returns the gravitational acceleration if gravity is turned on
Character.prototype.computeGravity = function () {
  return g_useGravity ? NOMINAL_GRAVITY : 0;
};

// updates the Character based on the acceleration and update interval
// -- uses average velocity to make game play frame indepentant -- 
Character.prototype.applyAccel = function (accelX, accelY, du) {
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

// Asks worldMap which collisionCells character is in. Filters out Empty tiles and 
// pushes the character out each cell that is left
Character.prototype.collideWithMap = function (du) {
  let gridCells = worldMap.getCollisionCells(this);
  this._debug_collisionCells = gridCells;

  let collisionCells = gridCells.filter((cell) => { 
    return !worldMap.passThrough(cell.content);
  })

  for (let i = 0; i < collisionCells.length; i++) {
    this.pushOut(collisionCells[i]);
  }
}

Character.prototype.pushOut = function (cell) {
  if (cell.content === worldMap.EMPTY_TILE) return;

  let tileSize = worldMap.getTileSize();

  let prev_charCoords = worldMap.getIndeciesFromCoords(this.prev_cx, this.prev_cy); // just use the center bc then rowLower makes more sense
  let charCoords = worldMap.getIndeciesFromCoords(this.collider.cx, this.collider.cy); // just use the center bc then rowLower makes more sense

  let charRow = charCoords.row;
  let charRow_lower = charRow + 1;
  let prev_charRow = prev_charCoords.row;
  let prev_charRow_lower = prev_charRow + 1;

  let charCol = charCoords.col;
  let prev_charCol = prev_charCoords.col;

  // Character is falling
  if (prev_charRow_lower <= cell.row
    && Math.abs(charCol - cell.col) <= 1 // can only fall on blocks that are in the same or adjacent colums
    && this.velY > 0 // can only stop on block if their velocity is down
    ) {

    // can not fall on something that has something other than air on top of it
    if (!worldMap.passThrough(worldMap.getTileType(cell.row - 1, cell.col))) return;

    this.velY = 0;
    this.cy = cell.cy 
      - tileSize/2
      - this.collider.height/2 
      - this.collider.offsetY;
    this.onGround = true;
    if (this.isPlayer) this.sprite.animation = 'IDLE';
    this.rotation = 0;
    this.collider.cy = this.cy;
  }

  // Character is jumping up
  if (prev_charRow > cell.row // can only jump into blocks above them
    && cell.col === charCol // can only jump into blocks in the same column
    && this.velY < 0 // can only jump into blocks if their velocity is up
    ) {
    // can not jump into something that has something other than air below it
    if (!worldMap.passThrough(worldMap.getTileType(cell.row+1, cell.col))) return;
    this.velY = 0;
    this.cy = cell.cy 
      + this.collider.height/2
      + this.collider.offsetY;
    this.collider.cy = this.cy;
  }
  
  // Character colliding with cell left of them
  if ((cell.row === prev_charRow || cell.row === prev_charRow_lower) // can only collide with block in the same row
  && prev_charCol > cell.col //&& charCol <= cell.col// can only collide with a block if you pass it
  && this.velX < 0 // can only collide on left if velocity is to the left 
  ) {
    if (!worldMap.passThrough(worldMap.getTileType(cell.row, cell.col + 1))) return;
    this.velX = 0;
    // move character to the cell to the right of the colliding block
    this.cx = cell.cx
      + tileSize / 2
      + this.collider.width / 2;
    this.collider.cx = this.cx;
  }

  // Character colliding with cell right of them
  if ((cell.row === prev_charRow || cell.row === prev_charRow_lower) 
    && prev_charCol < cell.col //&& charCol >= cell.col 
    && this.velX > 0) {
    if (!worldMap.passThrough(worldMap.getTileType(cell.row, cell.col - 1))) return;

    this.velX = 0;
    // move character to the cell to the left of the colliding block
    this.cx = cell.cx 
      - tileSize / 2
      - this.collider.width / 2;
    this.collider.cx = this.cx;
  }  
}

// Resets the character to their reset position and rotation
Character.prototype.reset = function () {
  this.setPos(this.reset_cx, this.reset_cy);
  this.rotation = this.reset_rotation;

  this.halt();
};

// Stops the character
Character.prototype.halt = function () {
  this.velX = 0;
  this.velY = 0;
};

Character.prototype.shouldUpdate = function () {
  const playerLoc = entityManager.getPlayer();
  const playerLocSq = Math.pow(playerLoc.cx - this.cx, 2) + Math.pow(playerLoc.cy - this.cy, 2);

  if (playerLocSq > Math.pow(g_canvas.height + g_canvas.width, 2)) {
    return null;
  }

  return { cx: playerLoc.cx, cy: playerLoc.cy, sqDist: playerLocSq };
}

// Renders the character to the given context
Character.prototype.render = function (ctx) {
  this.sprite.scale = this.scale;
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, this.direction < 0);
  this.debugRender(ctx);
};

// Debug renders
Character.prototype.debugRender = function (ctx) {
  if (g_char_debug_showCollisions) this._debug_RenderCollsionsCells(ctx);

}

// Renders the cells which the character is colliding with
// Empty tiles are white and other tiles are green
Character.prototype._debug_RenderCollsionsCells = function (ctx) {
  if (!this._debug_collisionCells) return;

  let tileSize = worldMap._tileSize;

  for (let i = 0; i < this._debug_collisionCells.length; i++) {
    let cell = this._debug_collisionCells[i];
    util.fillBoxCentered(ctx, 
      cell.col*tileSize, 
      cell.row*tileSize,
      tileSize, tileSize,
      cell.content === worldMap.EMPTY_TILE ? '#fff5' : '#0f05',
      );
  }
}

// depricated collision function
Character.prototype.collideWithMap_depr = function (du) {

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

// depricated pushout function
Character.prototype.pushOut_depr = function (around, grid) {
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