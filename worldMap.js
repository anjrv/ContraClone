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

  getRelativeWorldInfo: function (top, right, bottom, left) {
    return {};
  },

  updateCamera: function (changeX, changeY) {
    const newX = this._mapCameraCoords.cx + changeX;
    const newY = this._mapCameraCoords.cy + changeY;
    const nextCameraX = Math.floor(newX / this._tileSize);
    const nextCameraY = Math.floor(newY / this._tileSize);

    if (this.getTile(this._cameraTile.cx, nextCameraY, 0) === 'E') {
      this._cameraTile.cy = nextCameraY;
      this._mapCameraCoords.cy = newY;
    }

    if (this.getTile(nextCameraX, this._cameraTile.cy, 0) === 'E') {
      this._cameraTile.cx = nextCameraX;
      this._mapCameraCoords.cx = newX;
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

  recordCameraInfo: function (tag) { 
    tag.setAttribute('camtilecx', this._cameraTile.cx);
    tag.setAttribute('camtilecy', this._cameraTile.cy);
    tag.setAttribute('mapcamcoordscx', this._mapCameraCoords.cx);
    tag.setAttribute('mapcamcoordscy', this._mapCameraCoords.cy);
  },

  restoreCameraRecord: function (record)  {
    let camTile_cx = Number.parseFloat(record.attributes.camtilecx.nodeValue);
    let camTile_cy = Number.parseFloat(record.attributes.camtilecy.nodeValue);
    let mapCamCoords_cx = Number.parseFloat(record.attributes.mapcamcoordscx.nodeValue);
    let mapCamCoords_cy = Number.parseFloat(record.attributes.mapcamcoordscy.nodeValue);
    if (Number.isNaN(camTile_cx)
      || Number.isNaN(camTile_cy)
      || Number.isNaN(mapCamCoords_cx)
      || Number.isNaN(mapCamCoords_cy)
    ) throw new Error('Camera could not be restored properly');

    this._cameraTile.cx = camTile_cx;
    this._cameraTile.cy = camTile_cy;
    this._mapCameraCoords.cx = mapCamCoords_cx;
    this._mapCameraCoords.cy = mapCamCoords_cy;
  },
};
