'use strict';
/*jslint nomen: true, white: true, plusplus: true*/

const worldMap = {
  init: function (mapData) {
    // Map variables
    this._cols = mapData.cols;
    this._rows = mapData.rows;
    this._tileSize = mapData.tilesize;
    this._layers = mapData.layers;
    this._sprite = g_sprites.ground;
    this._sprite.scale = this._tileSize / this._sprite.sWidth;
    this._length = mapData.cols*mapData.rows;
    
    // Move Player to the start position
    const player = entityManager.getPlayer();
    player.cx = (mapData.playerSpawn % this._cols) * this._tileSize + this._tileSize / 2;
    player.cy = Math.floor(mapData.playerSpawn / this._cols) * this._tileSize - this._tileSize / 2;
    
    // Camera variables
    this._offsetX = -player.cx;
    this._offsetY = -player.cy;
    this.diffX = 0;
    this.diffY = 0;

    this.setupDebug();
  },

  setupDebug: function () {
    this._debug_showGridLines = false;
    this._debug_showCollisionBoxes = true;
  },

  update: function(du) {
    const player = entityManager.getPlayer();
    this.diffX = player.cx + this._offsetX;
    this.diffY = player.cy + this._offsetY;
    if (Math.abs(this.diffX) > g_canvas.width / 6) {
      this._offsetX = -(player.cx - Math.sign(this.diffX) * g_canvas.width / 6);
    }
    if (Math.abs(this.diffY) > g_canvas.width / 10) {
      this._offsetY = -(player.cy - Math.sign(this.diffY) * g_canvas.width / 10);
    }
  },
  
  render: function(ctx) {
    ctx.font = "10px Arial";
    for (let i = 0; i < this._layers[0].length; i++) {
      for (let j = 0; j < this._layers[0][i].length; j++) {
        const x = j * this._tileSize;
        const y = i * this._tileSize;
        if (this._layers[0][i][j] === 'E' || this._layers[0][i][j] === '0') continue;
        this._sprite.animation = this._layers[0][i][j];
        this._sprite.updateFrame(0);
        this._sprite.drawCentredAt(ctx, x, y, 0);
        // TODO
        // Add this line and commented out font line above to a diagnostics toggle.
         ctx.fillText(`${i} ${j}`, x, y);
      }
    }
    this.debugRender(ctx);
  },

  getIndeciesFromCoords: function (x, y) {
    let col = Math.floor((x + this._tileSize/2) / this._tileSize);
    let row = Math.floor((y + this._tileSize/2) / this._tileSize);
    return {col, row};
  },

  debugRender: function (ctx) {
    if (this._debug_showGridLines) this._debug_RenderGridLines(ctx);
    if (this._debug_showCollisionBoxes) this._debug_RenderCollisionBoxes(ctx);
  },

  _debug_RenderGridLines: function (ctx) {
    let oldStrokeStyle = ctx.strokeStyle;
    ctx.strokeStyle = 'cyan';
    for (let row = 0; row < this._rows; row++) {
      let y = row * this._tileSize - this._tileSize/2;
      ctx.moveTo(-500, y);
      ctx.lineTo(this._cols*this._tileSize, y);
      ctx.stroke();
    }
    for (let col = 0; col < this._cols; col++) {
      let x = col*this._tileSize - this._tileSize/2;
      ctx.moveTo(x, -100);
      ctx.lineTo(x, this._rows*this._tileSize);
      ctx.stroke();
    }

    ctx.strokeStyle = oldStrokeStyle;
  },

  _debug_RenderCollisionBoxes: function (ctx) {
    ctx.lineWidth = 5;
    if (this._drop1)
      util.strokeBoxCentered(ctx, 
        this._drop1[1]*this._tileSize, 
        this._drop1[0]*this._tileSize, 
        this._tileSize, 
        this._tileSize, this._drop1[2]?'green':'red');
    if (this._drop2) 
        util.strokeBoxCentered(ctx, 
          this._drop2[1]*this._tileSize, 
          this._drop2[0]*this._tileSize , 
          this._tileSize, 
          this._tileSize, this._drop2[2]?'green':'red');
      
     ctx.lineWidth = 1;
  },

  // returns a list of (col, row) indeciecs where collision can be occuring
  getCollisionCells: function (entity) {
    let cx = entity.collider.cx, 
        cy = entity.collider.cy;

    let w = entity.collider.width/2,
        h = entity.collider.height/2;
    
    let yoffset = entity.collider.offsetY;

    // because we draw the box at the center at the cordinates,
    // we have to translate to that center

    let topLeft = this.getIndeciesFromCoords(cx - w, cy - h + yoffset);
    let botRight = this.getIndeciesFromCoords(cx + w, cy + h + yoffset);

    let left = topLeft.col;
    let top = topLeft.row;
    let right = botRight.col;
    let bot = botRight.row;

    let coordinates = [];
    //iterate from the top coordinate to the bottom coordinate
    let storeLeft = left;
    while ( top <= bot) {
      left = storeLeft;
      while(left <= right) {
        coordinates.push({
          col: left, 
          row: top, 
          content: this._layers[0][top][left],
          cx: left * this._tileSize,
          cy: top * this._tileSize,
        });
        left++;
      }
      top++;
    }
    return coordinates;
  },

  // returns the grid cordinates of the entity
  getGridCoords: function (entity) {
    let cx = entity.collider.cx, 
        cy = entity.collider.cy;

    let w = entity.collider.width/2,
        h = entity.collider.height/2;
    
    let yoffset = entity.collider.offsetY-1;
    // because we draw the box at the center at the cordinates,
    // we have to translate to that center
    let dx = this._tileSize / 2,
        dy = this._tileSize / 2 + yoffset;

    return [Math.floor((cy-h + dy)/(this._tileSize)),
            Math.floor((cx-w + dx)/(this._tileSize)),
            Math.floor((cy+h + dy)/(this._tileSize)),
            Math.floor((cx+w + dx)/(this._tileSize))];
  },

  // true if nothing is BELOW entity
  // false if something is BELOW entity
  isDrop: function (entity) {
    let grid = this.getGridCoords(entity);
    try {
      let r = (this._layers[0][grid[2]][grid[1]] === 'E' && this._layers[0][grid[2]][grid[3]] === 'E');
      // this._drop1 = [[grid[2]], grid[1], this._layers[0][grid[2]+1][grid[1]] === 'E']
      // this._drop2 = [[grid[2]], grid[3], this._layers[0][grid[2]+1][grid[3]] === 'E']
      return r
    }
    catch (e) {
      return true;
    }
  },

  // true if nothing is LEFT of entity
  // false if something is LEFT of entity
  isLeft: function (entity) {
    let grid = this.getGridCoords(entity)
    try {
      return (this._layers[0][grid[2]][grid[1]] === 'E' && this._layers[0][grid[0]][grid[1]] === 'E');
    }
    catch (e) {
      return true;
    }
  },

  // true if nothing is RIGHT of entity 
  // false if something is RIGHT of entity
  isRight: function (entity) {
    let grid = this.getGridCoords(entity);
    try {
      return (this._layers[0][grid[2]][grid[1]+1] === 'E');
    }
    catch (e) {
      return true;
    }
  },

  // true if nothing is ABOVE entity
  // false if something is ABOVE entity
  isAbove: function (entity) {
    let grid = this.getGridCoords(entity);
    try {
      return (this._layers[0][grid[2]-1][grid[1]] === 'E' && this._layers[0][grid[2]-1][grid[3]] === 'E');
    }
    catch (e) {
      return true;
    }
  },

  // For each cardinal direction, returns if something is in that direction
  isAround: function (entity) {
    return { 
      T: this.isAbove(entity),
      B: this.isDrop(entity),
      L: this.isLeft(entity),
      R: this.isRight(entity)
    };
  }
}
