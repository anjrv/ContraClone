'use strict';
/*jslint nomen: true, white: true, plusplus: true*/

let g_showWorldCoordinates = false;

const worldMap = {
  EMPTY_TILE: '  ',

  init: function (mapData) {
    // Map variables
    this._cols = mapData.cols;
    this._rows = mapData.rows;
    this._tileSize = mapData.tilesize;
    this._layers = mapData.layers;
    this._sprite = g_sprites.tilesheet;
    this._sprite.scale = this._tileSize / this._sprite.sWidth;
    this._length = mapData.cols * mapData.rows;

    // Move Player to the start position
    const player = entityManager.getPlayer();
    player.cx =
      (mapData.playerSpawn % this._cols) * this._tileSize + this._tileSize / 2;
    player.cy =
      Math.floor(mapData.playerSpawn / this._cols) * this._tileSize -
      this._tileSize / 2;

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

  getTileSize: function () {
    return this._tileSize;
  },

  spawnNearbyUnits: function () {
    const addedShift = 5;

    const left = Math.max(
      Math.floor(
        (-this._offsetX - g_canvas.width / 6) / this._tileSize - addedShift,
      ),
      0,
    );
    const right = Math.min(
      left + g_canvas.width / this._tileSize + addedShift,
      this._layers[0][0].length,
    );
    const up = Math.max(
      Math.floor(
        (-this._offsetY - g_canvas.height / 6) / this._tileSize - addedShift,
      ),
      0,
    );
    const down = Math.min(
      up + g_canvas.height / this._tileSize + addedShift,
      this._layers[0].length,
    );

    for (let i = up; i < down; i++) {
      for (let j = left; j < right; j++) {
        const val = this._layers[0][i][j];
        if (val === '1' || val === '2' || val === '3') {
          const x = j * this._tileSize;
          const y = i * this._tileSize;
          this._layers[0][i][j] = worldMap.EMPTY_TILE;
          entityManager.spawnEnemy(val, x, y);
        }
      }
    }
  },

  update: function (du) {
    const player = entityManager.getPlayer();
    this.diffX = player.cx + this._offsetX;
    this.diffY = player.cy + this._offsetY;
    if (Math.abs(this.diffX) > g_canvas.width / 6) {
      this._offsetX = -(
        player.cx -
        (Math.sign(this.diffX) * g_canvas.width) / 6
      );
    }
    if (Math.abs(this.diffY) > g_canvas.height / 6) {
      this._offsetY = -(
        player.cy -
        (Math.sign(this.diffY) * g_canvas.height) / 6
      );
    }

    this.spawnNearbyUnits();
  },

  render: function (ctx) {
    // this.drawBackgrounds(ctx);
    for (let i = 0; i < this._layers[0].length; i++) {
      for (let j = 0; j < this._layers[0][i].length; j++) {
        const x = j * this._tileSize;
        const y = i * this._tileSize;

        const val = this._layers[0][i][j];
        if (
          val === '  ' ||
          val === '0' ||
          val === '1' ||
          val === '2' ||
          val === '3'
        )
          continue;
        this._sprite.animation = this._layers[0][i][j];
        this._sprite.updateFrame(0);
        this._sprite.drawCentredAt(ctx, x, y, 0);
      }
    }
    this.debugRender(ctx);
  },

  drawBackgrounds: function (ctx) {
    g_sprites.bg_layer1.drawWrappedCentredAt(
      ctx,
      g_canvas.width,
      g_canvas.height,
      0,
    );
    g_sprites.bg_layer2.drawWrappedCentredAt(
      ctx,
      g_canvas.width / 2,
      g_canvas.height / 2,
      0,
    );
    g_sprites.bg_layer3.drawWrappedCentredAt(
      ctx,
      g_canvas.width / 4,
      g_canvas.height / 4,
      0,
    );
  },

  getIndeciesFromCoords: function (x, y) {
    let col = Math.floor((x + this._tileSize / 2) / this._tileSize);
    let row = Math.floor((y + this._tileSize / 2) / this._tileSize);
    return { col, row };
  },

  getTileType: function (row, col) {
    try {
      return this._layers[0][row][col];
    } catch (e) {
      return this.EMPTY_TILE;
    }
  },

  debugRender: function (ctx) {
    if (this._debug_showCollisionBoxes) this._debug_RenderCollisionBoxes(ctx); // not really used
    if (g_showWorldCoordinates) this._debug_RenderWorldIndecies(ctx);
  },

  _debug_RenderWorldIndecies: function (ctx) {
    let oldFont = ctx.font;
    let oldAlignment = ctx.textAlign;
    ctx.font = '10px Arial';
    for (let i = 0; i < this._layers[0].length; i++) {
      for (let j = 0; j < this._layers[0][i].length; j++) {
        const x = j * this._tileSize;
        const y = i * this._tileSize;
        ctx.fillText(`${i}-${j}`, x, y);
      }
    }
    ctx.font = oldFont;
    ctx.textAlign = oldAlignment;
  },

  _debug_RenderGridLines: function (ctx) {
    let oldStrokeStyle = ctx.strokeStyle;
    ctx.strokeStyle = 'cyan';
    for (let row = 0; row < this._rows; row++) {
      let y = row * this._tileSize - this._tileSize / 2;
      ctx.moveTo(-500, y);
      ctx.lineTo(this._cols * this._tileSize, y);
      ctx.stroke();
    }
    for (let col = 0; col < this._cols; col++) {
      let x = col * this._tileSize - this._tileSize / 2;
      ctx.moveTo(x, -100);
      ctx.lineTo(x, this._rows * this._tileSize);
      ctx.stroke();
    }

    ctx.strokeStyle = oldStrokeStyle;
  },

  _debug_RenderCollisionBoxes: function (ctx) {
    ctx.lineWidth = 5;
    if (this._drop1)
      util.strokeBoxCentered(
        ctx,
        this._drop1[1] * this._tileSize,
        this._drop1[0] * this._tileSize,
        this._tileSize,
        this._tileSize,
        this._drop1[2] ? 'green' : 'red',
      );
    if (this._drop2)
      util.strokeBoxCentered(
        ctx,
        this._drop2[1] * this._tileSize,
        this._drop2[0] * this._tileSize,
        this._tileSize,
        this._tileSize,
        this._drop2[2] ? 'green' : 'red',
      );

    ctx.lineWidth = 1;
  },

  // returns a list of (col, row) indeciecs where collision can be occuring
  getCollisionCells: function (entity) {
    let cx = entity.collider.cx,
      cy = entity.collider.cy;

    // previous coordinates, if entity has them stored
    let prev_cx = entity.prev_cx || cx,
      prev_cy = entity.prev_cy || cy;

    let w = entity.collider.width / 2,
      h = entity.collider.height / 2;

    let yoffset = entity.collider.offsetY;

    // because we draw the box at the center at the cordinates,
    // we have to translate to that center

    let topLeft = this.getIndeciesFromCoords(cx - w, cy - h + yoffset);
    let botRight = this.getIndeciesFromCoords(cx + w, cy + h + yoffset);

    let prev_topLeft = this.getIndeciesFromCoords(
      prev_cx - w,
      prev_cy - h + yoffset,
    );
    let prev_botRight = this.getIndeciesFromCoords(
      prev_cx + w,
      prev_cy + h + yoffset,
    );

    let left = topLeft.col < prev_topLeft.col ? topLeft.col : prev_topLeft.col;
    let top = topLeft.row < prev_topLeft.row ? topLeft.row : prev_topLeft.row;
    let right =
      botRight.col > prev_botRight.col ? botRight.col : prev_botRight.col;
    let bot =
      botRight.row > prev_botRight.row ? botRight.row : prev_botRight.row;

    let coordinates = [];
    //iterate from the top coordinate to the bottom coordinate
    let storeLeft = left;
    while (top <= bot) {
      left = storeLeft;
      while (left <= right) {
        let content;
        // make sure we don't index out of the array
        try {
          content = this._layers[0][top][left];
        } catch (e) {
          content = '  ';
        }
        coordinates.push({
          col: left,
          row: top,
          content,
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

    let w = entity.collider.width / 2,
      h = entity.collider.height / 2;

    let yoffset = entity.collider.offsetY - 1;
    // because we draw the box at the center at the cordinates,
    // we have to translate to that center
    let dx = this._tileSize / 2,
      dy = this._tileSize / 2 + yoffset;

    return [
      Math.floor((cy - h + dy) / this._tileSize),
      Math.floor((cx - w + dx) / this._tileSize),
      Math.floor((cy + h + dy) / this._tileSize),
      Math.floor((cx + w + dx) / this._tileSize),
    ];
  },

  // true if nothing is BELOW entity
  // false if something is BELOW entity
  isDrop: function (entity) {
    let grid = this.getGridCoords(entity);
    try {
      let r =
        this._layers[0][grid[2]][grid[1]] === '  ' &&
        this._layers[0][grid[2]][grid[3]] === '  ';
      // this._drop1 = [[grid[2]], grid[1], this._layers[0][grid[2]+1][grid[1]] === '  ']
      // this._drop2 = [[grid[2]], grid[3], this._layers[0][grid[2]+1][grid[3]] === '  ']
      return r;
    } catch (e) {
      return true;
    }
  },

  // true if nothing is LEFT of entity
  // false if something is LEFT of entity
  isLeft: function (entity) {
    let grid = this.getGridCoords(entity);
    try {
      return (
        this._layers[0][grid[2]][grid[1]] === '  ' &&
        this._layers[0][grid[0]][grid[1]] === '  '
      );
    } catch (e) {
      return true;
    }
  },

  // true if nothing is RIGHT of entity
  // false if something is RIGHT of entity
  isRight: function (entity) {
    let grid = this.getGridCoords(entity);
    try {
      return this._layers[0][grid[2]][grid[1] + 1] === '  ';
    } catch (e) {
      return true;
    }
  },

  // true if nothing is ABOVE entity
  // false if something is ABOVE entity
  isAbove: function (entity) {
    let grid = this.getGridCoords(entity);
    try {
      return (
        this._layers[0][grid[2] - 1][grid[1]] === '  ' &&
        this._layers[0][grid[2] - 1][grid[3]] === '  '
      );
    } catch (e) {
      return true;
    }
  },

  // For each cardinal direction, returns if something is in that direction
  isAround: function (entity) {
    return {
      T: this.isAbove(entity),
      B: this.isDrop(entity),
      L: this.isLeft(entity),
      R: this.isRight(entity),
    };
  },
};
