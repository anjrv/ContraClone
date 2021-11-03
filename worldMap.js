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

    // Camera variables
    this._offsetX = 0;
    this._offsetY = 0;
  },

  update: function(du) {
    const player = entityManager.getPlayer();
    const diffX = Math.abs(player.cx + this._offsetX);
    if (diffX > g_canvas.width / 1.5) {
      console.log(diffX)
      this._offsetX = -player.cx;
    }
    //this._offsetX = -player.cx;

    // const minOffset = g_canvas.width / 7;
    // const maxOffset = g_canvas.width / 2;

    // if (player.offsetX >= minOffset && player.offsetX <= maxOffset) {
    //   if (Math.sign(player.velX) < 0) player.offsetX--;
    //   else player.offsetX++;
    // } else {
    //   this._offsetX = player.offsetX;
    // }
  },
  
  render: function(ctx) {
    ctx.save();
    ctx.translate(this._offsetX, this._offsetY);
    for (let i = 0; i < this._layers[0].length; i++) {
      const x = (i % this._cols) * this._tileSize;
      const y = (Math.floor(i / this._cols)) * this._tileSize;
      if (this._layers[0][i] === 'E' || this._layers[0][i] === '0') continue;
      this._sprite.animation = this._layers[0][i];
      this._sprite.updateFrame(0);
      this._sprite.drawCentredAt(ctx, x + this._sprite.sWidth / 2, y + this._sprite.sWidth / 2, 0);
    }
    ctx.restore();
  }
}