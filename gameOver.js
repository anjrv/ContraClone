'use strict';
/*jslint nomen: true, white: true, plusplus: true*/

const gameOver = {
  restart: function () {
    m_gameover.play();
    lives = baseLives;
    setTimeout(function () {
      gameOver.drawGameOver();
    }, 1000);
    setTimeout(function () {
      g_start(g_ctx);
    }, 10000);
  },

  drawGameOver: function () {
    let offsetX = worldMap._offsetX + g_worldOffsetX;
    let offsetY = worldMap._offsetY - g_worldOffsetY;
    g_ctx.save();
    g_ctx.font = '40px PressStart2P';
    g_ctx.textAlign = 'center';
    g_ctx.fillText('Game over', g_canvas.width / 2, g_canvas.height / 2);
  },
};
