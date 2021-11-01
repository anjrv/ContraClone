'use strict';
/*jslint nomen: true, white: true, plusplus: true*/

const worldMap = {
  init: function (mapData) {
    this._cols = mapData.cols;
    this._rows = mapData.rows;
    this._tileSize = mapData.tilesize;
    this._layers = mapData.layers;
    this._offsetX = 0;
    this._offsetY = 0;
    this._currChangeX = 0;
    this._currChangeY = 0;

    // Grab initial spawn tile, currently we assume layer 0 but we need to decide how many layers we use
    const playerIndex = this._layers[0].indexOf('0');

    this._cameraTile = {
      cx: playerIndex % this._cols,
      cy: Math.floor(playerIndex / this._cols),
    };

    this._mapCameraCoords = {
      cx: this._cameraTile.cx * this._tileSize + this._tileSize / 2,
      cy: this._cameraTile.cy * this._tileSize + this._tileSize,
    };
    // Clear spawn point for "collision"
    this._layers[0][playerIndex] = 'E';
  },

  getTile: function (col, row, layer) {
    return this._layers[layer][row * this._cols + col];
  },

  getTileFromCoords(cx, cy) {
    const playerX = g_ctx.canvas.width / 2 + this._tileSize / 2;
    const playerY = g_ctx.canvas.height / 2 + this._tileSize / 2;

    const xDiff = playerX - cx;
    const yDiff = playerY - cy;

    const c = this._cameraTile.cx - Math.floor(xDiff / this._tileSize);
    const r = this._cameraTile.cy - Math.floor(yDiff / this._tileSize);


    return {
      col: c,
      row: r,
      // Offset from the middle of the current tile
      // Use to calculate distance to next obstacle
      offsetX: -(xDiff % this._tileSize + this._offsetX),
      offsetY: -(yDiff % this._tileSize + this._offsetY)
    };
  },

  getRelativeWorldInfo: function (cx, cy) {
    // Get unit tile from player pos
    const currTile = this.getTileFromCoords(cx, cy);

    // Start off allowing a tiles worth of distance
    let left = this._tileSize;
    let right = left;
    let down = left;
    let up = left;

    // TODO, if bullets can go faster than a tile a sec we need to do some line calculations instead
    // // Adjust based on adjacent tiles, apply smaller max dist where applicable
    // if (this.getTile(currTile.col - 1, currTile.row, 0) !== 'E') {
    //   left = left + currTile.offsetX;
    // }

    // if (this.getTile(currTile.col + 1, currTile.row, 0) !== 'E') {
    //   right = right - currTile.offsetX;
    // }

    // if (this.getTile(currTile.col, currTile.row + 1, 0) !== 'E') {
    //   down = down - currTile.offsetY;
    // }

    // if (this.getTile(currTile.col, currTile.row - 1, 0) !== 'E') {
    //   up = up + currTile.offsetY;
    // }

    return {
      distLeft: left,
      distRight: right,
      distDown: down,
      distUp: up,
      cameraShiftX: this._currChangeX,
      cameraShiftY: this._currChangeY
      // Add amount of floors for the drop floor effect? Would just iterate further down
    };
  },

  updateCamera: function (changeX, changeY) {
    const newX = this._mapCameraCoords.cx + changeX;
    const newY = this._mapCameraCoords.cy + changeY;
    const nextCameraX = Math.floor(newX / this._tileSize);
    const nextCameraY = Math.floor(newY / this._tileSize);

    if (this.getTile(this._cameraTile.cx, nextCameraY, 0) === 'E') {
      this._cameraTile.cy = nextCameraY;
      this._mapCameraCoords.cy = newY;
      this._currChangeY = changeY;
    } else {
      this._currChangeY = 0;
    }

    if (this.getTile(nextCameraX, this._cameraTile.cy, 0) === 'E') {
      this._cameraTile.cx = nextCameraX;
      this._mapCameraCoords.cx = newX;
      this._currChangeX = changeX;
    } else {
      this._currChangeX = 0;
    }

    this._offsetY =
      -this._mapCameraCoords.cy + this._cameraTile.cy * this._tileSize;
    this._offsetX =
      -this._mapCameraCoords.cx + this._cameraTile.cx * this._tileSize;

    return this.getTile(this._cameraTile.cx, nextCameraY, 0) !== 'E';
  },

  update: function (du) {
    // Could use this to spawn new enemies when they come into the viewport

    return;
  },

  render: function (ctx) {
    const playerX = ctx.canvas.width / 2 + this._tileSize / 2;
    const playerY = ctx.canvas.height / 2 + this._tileSize;
    const numHalfCols = Math.floor(ctx.canvas.height / this._tileSize);
    const numHalfRows = Math.floor(ctx.canvas.width / this._tileSize);

    for (let i = 0; i < this._layers.length; i++) {
      for (let col = -numHalfCols; col <= numHalfCols; col++) {
        for (let row = -numHalfRows; row <= numHalfRows; row++) {
          const val = this.getTile(
            this._cameraTile.cx + col,
            this._cameraTile.cy + row,
            i,
          );
          if (g_renderSpatialDebug && val) {
            util.strokeBoxCentered(
              ctx,
              playerX + this._tileSize * col + this._offsetX,
              playerY + this._tileSize * row + this._offsetY,
              this._tileSize,
              this._tileSize,
              'cyan',
            );
          }
          if (val === 'G') {
            util.fillBoxCentered(
              ctx,
              playerX + this._tileSize * col + this._offsetX,
              playerY + this._tileSize * row + this._offsetY,
              this._tileSize,
              this._tileSize,
              'green',
            );
          } else if (val === 'F') {
            util.fillBoxCentered(
              ctx,
              playerX + this._tileSize * col + this._offsetX,
              playerY + this._tileSize * row + this._offsetY,
              this._tileSize,
              this._tileSize,
              'orange',
            );
          }
        }
      }
    }
  },
};
