// ==========
// HUD
// ==========

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

let level = 'Level 1';
const hud = {
  drawHud: function (ctx, offsetX, offsetY) {
    //this.drawBox(ctx,offsetX,offsetY)
    //this.drawLevel(ctx, offsetX, offsetY)
    this.drawLives(ctx, offsetX, offsetY);
    this.drawPowerup(ctx, offsetX, offsetY);
    this.drawScore(ctx, offsetX, offsetY);
    ctx.globalAlpha = 1;
  },

<<<<<<< HEAD
    drawBox: function(ctx, offsetX, offsetY) {
        ctx.save()
        ctx.fillStyle = 'black'
        ctx.fillRect(-offsetX, -offsetY, g_canvas.width, 80);
        ctx.strokeStyle = 'blue'
        ctx.lineWidth = 6
        ctx.strokeRect(40 -offsetX, 40 -offsetY,  70 + (s_lives * 20), 80);
        ctx.strokeStyle = 'orange'
        ctx.lineWidth = 2
        ctx.strokeRect(40 - offsetX + 3, 40 -offsetY + 3, 64 + (s_lives * 20), 74)
        ctx.restore()
    },

    drawLevel: function(ctx, offsetX, offsetY) {
        ctx.save();
        ctx.font = '26px PressStart2P';
        ctx.textAlign = 'center'
        ctx.fillText(level, 200 - offsetX, 100 - offsetY);
        ctx.restore();
    },
    
    drawLives: function(ctx, offsetX, offsetY) {
        ctx.save();
        for (let i = 0; i < s_lives; i++) {
            ctx.drawImage(g_sprites.lives.image, (40 + i * 20) - offsetX, 40 - offsetY, 48, 48);
        }
        ctx.restore();
    },
    
    drawPowerup: function(ctx, offsetX, offsetY) {
        ctx.save()
        if      (s_noPowerup)     { ctx.drawImage(g_sprites.basepower.image, (70 + s_lives * 20)- offsetX, 54 - offsetY, 48, 48) }
        else if (s_firePowerup)   { ctx.drawImage(g_sprites.firepowerup.image, (70 + s_lives * 20) - offsetX, 44 - offsetY, 48, 48) }
        else if (s_triplePowerup) { ctx.drawImage(g_sprites.triplepowerup.image, (70 + s_lives * 20) - offsetX, 40 - offsetY, 48, 48) }
        else if (s_piercePowerup) { ctx.drawImage(g_sprites.piercepowerup.image, (70 + s_lives * 20) - offsetX, 40 - offsetY, 48, 48)}
        ctx.restore()
    },
    
    drawScore: function(ctx, offsetX, offsetY) {
        ctx.font = '26px PressStart2P';
        ctx.fillText(s_coins + "§", g_canvas.width-100 - offsetX, 80 - offsetY);
    },
}
=======
  drawBox: function (ctx, offsetX, offsetY) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(-offsetX, -offsetY, g_canvas.width, 80);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 6;
    ctx.strokeRect(40 - offsetX, 40 - offsetY, 70 + lives * 20, 80);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.strokeRect(40 - offsetX + 3, 40 - offsetY + 3, 64 + lives * 20, 74);
    ctx.restore();
  },

  drawLevel: function (ctx, offsetX, offsetY) {
    ctx.save();
    ctx.font = '26px PressStart2P';
    ctx.textAlign = 'center';
    ctx.fillText(level, 200 - offsetX, 100 - offsetY);
    ctx.restore();
  },
>>>>>>> ae2835c38b94f03c541476e1bac430c8c8da11d8

  drawLives: function (ctx, offsetX, offsetY) {
    ctx.save();
    for (let i = 0; i < lives; i++) {
      ctx.drawImage(
        g_sprites.lives.image,
        40 + i * 20 - offsetX,
        40 - offsetY,
        48,
        48,
      );
    }
    ctx.restore();
  },

  drawPowerup: function (ctx, offsetX, offsetY) {
    ctx.save();
    if (noPowerup) {
      ctx.drawImage(
        g_sprites.basepower.image,
        70 + lives * 20 - offsetX,
        54 - offsetY,
        48,
        48,
      );
    } else if (firePowerup) {
      ctx.drawImage(
        g_sprites.firepowerup.image,
        70 + lives * 20 - offsetX,
        44 - offsetY,
        48,
        48,
      );
    } else if (triplePowerup) {
      ctx.drawImage(
        g_sprites.triplepowerup.image,
        70 + lives * 20 - offsetX,
        40 - offsetY,
        48,
        48,
      );
    } else if (piercePowerup) {
      ctx.drawImage(
        g_sprites.piercepowerup.image,
        70 + lives * 20 - offsetX,
        40 - offsetY,
        48,
        48,
      );
    }
    ctx.restore();
  },

  drawScore: function (ctx, offsetX, offsetY) {
    ctx.font = '26px PressStart2P';
    ctx.fillText(coins + '§', g_canvas.width - 100 - offsetX, 80 - offsetY);
  },
};
