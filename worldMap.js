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

    
    // Move Player to the start position
    const player = entityManager.getPlayer();
    player.cx = (mapData.playerSpawn % this._cols) * this._tileSize + this._tileSize / 2;
    player.cy = Math.floor(mapData.playerSpawn / this._cols) * this._tileSize - this._tileSize / 2;
    
    // Camera variables
    this._offsetX = -player.cx;
    this._offsetY = -player.cy;
    this.diffX = 0;
    this.diffY = 0;
  },

  update: function(du) {
    const player = entityManager.getPlayer();
    this.diffX = player.cx + this._offsetX;
    this.diffY = player.cy + this._offsetY;
    if (Math.abs(this.diffX) > g_canvas.width / 12) {
      this._offsetX = -(player.cx - Math.sign(this.diffX) * g_canvas.width / 12);
    }
    if (Math.abs(this.diffY) > g_canvas.width / 12) {
      this._offsetY = -(player.cy - Math.sign(this.diffY) * g_canvas.width / 12);
    }
  },
  
  render: function(ctx) {
    ctx.save();
    //ctx.font = "10px Arial";
    ctx.translate(this._offsetX, this._offsetY);
    for (let i = 0; i < this._layers[0].length; i++) {
      const x = (i % this._cols) * this._tileSize;
      const y = (Math.floor(i / this._cols)) * this._tileSize;
      if (this._layers[0][i] === 'E' || this._layers[0][i] === '0') continue;
      this._sprite.animation = this._layers[0][i];
      this._sprite.updateFrame(0);
      this._sprite.drawCentredAt(ctx, x + this._sprite.sWidth / 2 + g_canvas.width / 4, y + this._sprite.sWidth / 2 + g_canvas.height / 2, 0);
      //ctx.fillText(`${x}, ${y}`, x, y);
    }
    ctx.restore();
  }
}