let s_fireRate = 30;
let s_fireRatio = 1;
let s_noPowerup = true;
let s_firePowerup = false;
let s_triplePowerup = false;
let s_piercePowerup = false;
let s_baseLives = 5;
let s_lives = s_baseLives;
let s_livesMax = 15;
let s_coins = 10000;
const s_shopOffsetY = g_canvas.height / 2.5;
const s_shopOffsetX = g_canvas.width / 4;
const s_shopBottom = g_canvas.height - 100;
let s_menuTileSize = 12;
let s_menuSelection = 0;

const mainShop = {
  init: function () {
    this.frame = 0;
    this.sprite = g_sprites.box;
    this.sprite.animation = 'SQUARE';
  },

  drawShop: function () {
    this.drawBox();
    this.drawTitle();
    this.drawItems();
  },

  drawBox: function () {
    this.sprite.animation = 'SQUARE';
    this.sprite.updateFrame(0);
    g_shopCtx.save();
    g_shopCtx.fillStyle = '#070809';
    g_shopCtx.fillRect(
      s_shopOffsetX,
      s_shopOffsetY,
      s_shopOffsetX * 2 + s_menuTileSize / 2,
      s_shopBottom - s_shopOffsetY + s_menuTileSize / 2,
    );
    this.sprite.drawCentredAt(g_shopCtx, s_shopOffsetX, s_shopOffsetY, 0, 0);
    this.sprite.drawCentredAt(
      g_shopCtx,
      g_canvas.width - s_shopOffsetX,
      s_shopOffsetY,
      0,
      0,
    );
    this.sprite.drawCentredAt(g_shopCtx, s_shopOffsetX, s_shopBottom, 0, 0);
    this.sprite.drawCentredAt(
      g_shopCtx,
      g_canvas.width - s_shopOffsetX,
      s_shopBottom,
      0,
      0,
    );
    for (
      let i = s_shopOffsetX + s_menuTileSize;
      i < g_canvas.width - s_shopOffsetX;
      i += s_menuTileSize
    ) {
      this.sprite.animation = 'UP';
      this.sprite.updateFrame(0);
      this.sprite.drawCentredAt(g_shopCtx, i, s_shopOffsetY, 0, 0);
      this.sprite.animation = 'DOWN';
      this.sprite.updateFrame(0);
      this.sprite.drawCentredAt(g_shopCtx, i, s_shopBottom, 0, 0);
    }
    for (
      let i = s_shopOffsetY + s_menuTileSize;
      i < s_shopBottom - s_menuTileSize;
      i += s_menuTileSize
    ) {
      this.sprite.animation = 'LEFT';
      this.sprite.updateFrame(0);
      this.sprite.drawCentredAt(g_shopCtx, s_shopOffsetX, i, 0, 0);
      this.sprite.animation = 'RIGHT';
      this.sprite.updateFrame(0);
      this.sprite.drawCentredAt(g_shopCtx, g_canvas.width - s_shopOffsetX, i, 0, 0);
    }
    g_shopCtx.restore();
  },

  drawTitle: function () {
    g_shopCtx.save();
    g_shopCtx.fillStyle = 'white';
    g_shopCtx.font = '15px PressStart2P';
    g_shopCtx.textAlign = 'center';
    g_shopCtx.fillText(
      'Space Shop',
      s_shopOffsetX + (s_shopOffsetX * 2 + s_menuTileSize / 2) / 2,
      s_shopOffsetY + 50,
    );
    this.sprite.animation = 'SQUARE';
    this.sprite.updateFrame(0);
    this.sprite.drawCentredAt(
      g_shopCtx,
      s_shopOffsetX + 230,
      s_shopOffsetY + 40,
      0,
      0,
    );
    this.sprite.drawCentredAt(
      g_shopCtx,
      g_canvas.width - s_shopOffsetX - 240,
      s_shopOffsetY + 40,
      0,
      0,
    );
    g_shopCtx.restore();
  },

  drawItems: function () {
    g_shopCtx.save();
    g_shopCtx.font = '12px PressStart2P';

    // Coins
    g_shopCtx.fillStyle = 'green';
    g_shopCtx.textAlign = 'right';
    g_shopCtx.fillText(
      s_coins + '§',
      g_canvas.width - s_shopOffsetX - 50,
      s_shopOffsetY + 40,
    );

    // Base Lives
    g_shopCtx.fillStyle = s_menuSelection === 0 ? 'white' : 'grey';
    g_shopCtx.textAlign = 'left';
    g_shopCtx.fillText('Base Lives', s_shopOffsetX + 50, s_shopOffsetY + 90);
    g_shopCtx.fillStyle = 'green';
    g_shopCtx.textAlign = 'center';
    g_shopCtx.fillText(s_baseLives, s_shopOffsetX + 400, s_shopOffsetY + 90);
    g_shopCtx.fillStyle = 'blue';
    g_shopCtx.textAlign = 'right';
    if (s_baseLives !== s_livesMax) {
      g_shopCtx.fillText(
        s_baseLives * 150 + '§',
        g_canvas.width - s_shopOffsetX - 50,
        s_shopOffsetY + 90,
      );
    } else {
      g_shopCtx.fillText(
        'MAX',
        g_canvas.width - s_shopOffsetX - 50,
        s_shopOffsetY + 90,
      );
    }

    // Fire Rate
    g_shopCtx.textAlign = 'left';
    g_shopCtx.fillStyle = s_menuSelection === 1 ? 'white' : 'grey';
    g_shopCtx.fillText('Fire Rate', s_shopOffsetX + 50, s_shopOffsetY + 120);
    g_shopCtx.fillStyle = 'green';
    g_shopCtx.textAlign = 'center';
    g_shopCtx.fillText(s_fireRatio, s_shopOffsetX + 400, s_shopOffsetY + 120);
    g_shopCtx.fillStyle = 'blue';
    g_shopCtx.textAlign = 'right';
    if (s_fireRate !== 10) {
      g_shopCtx.fillText(
        s_fireRatio * 500 + '§',
        g_canvas.width - s_shopOffsetX - 50,
        s_shopOffsetY + 120,
      );
    } else {
      g_shopCtx.fillText(
        'MAX',
        g_canvas.width - s_shopOffsetX - 50,
        s_shopOffsetY + 120,
      );
    }

    // Gun upgrade
    g_shopCtx.textAlign = 'left';
    g_shopCtx.fillStyle = s_menuSelection === 2 ? 'white' : 'grey';
    g_shopCtx.fillText('Flamethrower', s_shopOffsetX + 50, s_shopOffsetY + 150);
    g_shopCtx.fillStyle = s_menuSelection === 3 ? 'white' : 'grey';
    g_shopCtx.fillText('Triple Shot', s_shopOffsetX + 50, s_shopOffsetY + 180);
    g_shopCtx.fillStyle = s_menuSelection === 4 ? 'white' : 'grey';
    g_shopCtx.fillText('Pierce Shot', s_shopOffsetX + 50, s_shopOffsetY + 210);

    if (s_firePowerup) {
      g_shopCtx.fillStyle = 'green';
      g_shopCtx.textAlign = 'center';
      g_shopCtx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 150);
    }
    g_shopCtx.fillStyle = 'blue';
    g_shopCtx.textAlign = 'right';
    g_shopCtx.fillText(
      1000 + '§',
      g_canvas.width - s_shopOffsetX - 50,
      s_shopOffsetY + 150,
    );
    if (s_triplePowerup) {
      g_shopCtx.fillStyle = 'green';
      g_shopCtx.textAlign = 'center';
      g_shopCtx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 180);
    }
    g_shopCtx.fillStyle = 'blue';
    g_shopCtx.textAlign = 'right';
    g_shopCtx.fillText(
      1000 + '§',
      g_canvas.width - s_shopOffsetX - 50,
      s_shopOffsetY + 180,
    );
    if (s_piercePowerup) {
      g_shopCtx.fillStyle = 'green';
      g_shopCtx.textAlign = 'center';
      g_shopCtx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 210);
    }
    g_shopCtx.fillStyle = 'blue';
    g_shopCtx.textAlign = 'right';
    g_shopCtx.fillText(
      1000 + '§',
      g_canvas.width - s_shopOffsetX - 50,
      s_shopOffsetY + 210,
    );

    // Warp to level
    g_shopCtx.textAlign = 'left';
    g_shopCtx.fillStyle = s_menuSelection === 5 ? 'white' : 'grey';
    g_shopCtx.fillText(
      'Warp to Alien Base',
      s_shopOffsetX + 50,
      s_shopOffsetY + 240,
    );
    g_shopCtx.fillStyle = s_menuSelection === 6 ? 'white' : 'grey';
    g_shopCtx.fillText('Warp to Climb', s_shopOffsetX + 50, s_shopOffsetY + 270);
    g_shopCtx.fillStyle = s_menuSelection === 7 ? 'white' : 'grey';
    g_shopCtx.fillText('Warp to Level 4', s_shopOffsetX + 50, s_shopOffsetY + 300);
    if (currentLevel === 0) {
      g_shopCtx.fillStyle = 'green';
      g_shopCtx.textAlign = 'center';
      g_shopCtx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 240);
    }
    g_shopCtx.fillStyle = 'blue';
    g_shopCtx.textAlign = 'right';
    g_shopCtx.fillText(
      2000 + '§',
      g_canvas.width - s_shopOffsetX - 50,
      s_shopOffsetY + 240,
    );
    if (currentLevel === 1) {
      g_shopCtx.fillStyle = 'green';
      g_shopCtx.textAlign = 'center';
      g_shopCtx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 270);
    }
    g_shopCtx.fillStyle = 'blue';
    g_shopCtx.textAlign = 'right';
    g_shopCtx.fillText(
      3000 + '§',
      g_canvas.width - s_shopOffsetX - 50,
      s_shopOffsetY + 270,
    );
    if (currentLevel === 2) {
      g_shopCtx.fillStyle = 'green';
      g_shopCtx.textAlign = 'center';
      g_shopCtx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 300);
    }
    g_shopCtx.fillStyle = 'blue';
    g_shopCtx.textAlign = 'right';
    g_shopCtx.fillText(
      4000 + '§',
      g_canvas.width - s_shopOffsetX - 50,
      s_shopOffsetY + 300,
    );

    // Double jump
    g_shopCtx.textAlign = 'left';
    g_shopCtx.fillStyle = s_menuSelection === 8 ? 'white' : 'grey';
    g_shopCtx.fillText('Double Jump', s_shopOffsetX + 50, s_shopOffsetY + 330);
    g_shopCtx.fillStyle = 'green';
    g_shopCtx.textAlign = 'center';
    g_shopCtx.fillText(Player.MAX_JUMPS, s_shopOffsetX + 400, s_shopOffsetY + 330);
    g_shopCtx.fillStyle = 'blue';
    g_shopCtx.textAlign = 'right';
    if (Player.MAX_JUMPS !== 3) {
      g_shopCtx.fillText(
        Player.MAX_JUMPS * 1000 + '§',
        g_canvas.width - s_shopOffsetX - 50,
        s_shopOffsetY + 330,
      );
    } else {
      g_shopCtx.fillText(
        'MAX',
        g_canvas.width - s_shopOffsetX - 50,
        s_shopOffsetY + 330,
      );
    }
    g_shopCtx.restore();
  },
};
