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

    // Grab initial spawn tile, currently we assume layer 0 but we need to decide how many layers we use
    const playerIndex = this._layers[0].indexOf('0');
    this._cameraTile = {
      cx: playerIndex % this._cols,
      cy: Math.floor(playerIndex / this._cols),
    };
    // Assume we start in the middle of the spawning tile
    this._mapCameraCoords = {
      cx: this._cameraTile.cx * this._tileSize + this._tileSize / 2,
      cy: this._cameraTile.cy * this._tileSize + this._tileSize / 2,
    };
    this._layers[0][playerIndex] = 'E';
  },

  getTile: function (col, row, layer) {
    return this._layers[layer][row * this._cols + col];
  },

  getPlayerFloorInfo: function () {
    // Todo for multifloors, return relative Y distance from "current" floor and whether you could drop floors
    return {
      distanceToNextFloor: 1,
      currentFloorNumber: 1,
    };
  },

  updateCamera: function (changeX, changeY) {
    const newX = this._mapCameraCoords.cx + changeX;
    const newY = this._mapCameraCoords.cy + changeY;
    const nextCameraX = Math.floor(newX / this._tileSize);
    const nextCameraY = Math.floor(newY / this._tileSize);

    if (this.getTile(this._cameraTile.cx, nextCameraY, 0) === "E") {
      this._cameraTile.cy = Math.floor(newY / this._tileSize);
      this._mapCameraCoords.cy = newY;
      //this._offsetY = ... should apply offset to smooth rendering, need to know charsize
    }

    if (this.getTile(nextCameraX, this._cameraTile.cy, 0) === "E") {
      this._cameraTile.cx = Math.floor(newX / this._tileSize);
      this._mapCameraCoords.cx = newX;
      //this._offsetX = ... should apply offset to smooth rendering, need to know charsize
    }
  },

  update: function (du) {
    // Could use this to spawn new enemies when they come into the viewport

    return;
  },

  render: function (ctx) {
    const playerX = ctx.canvas.width / 2;
    const playerY = ctx.canvas.height / 2;
    const numHalfCols = Math.ceil(ctx.canvas.height / this._tileSize);
    const numHalfRows = Math.ceil(ctx.canvas.width / this._tileSize);

    for (let i = 0; i < this._layers.length; i++) {
      for (let col = -numHalfCols; col <= numHalfCols; col++) {
        for (let row = -numHalfRows; row <= numHalfRows; row++) {
          const val = this.getTile(
            this._cameraTile.cx + col,
            this._cameraTile.cy + row,
            i,
          );
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
