var s_fireRate = 30;
var s_fireRatio = 1;
var s_noPowerup = true;
var s_firePowerup = false;
var s_triplePowerup = false;
var s_piercePowerup = false;
var s_baseLives = 5;
var s_lives = s_baseLives;
var s_livesMax = 15;
var s_coins = 0;
var s_shopOffsetY = g_canvas.height / 2.5;
var s_shopOffsetX = g_canvas.width / 4;
var s_shopBottom = g_canvas.height - 100;
var s_menuTileSize = 12;
var s_menuSelection = 0;

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
        g_ctx.save()
        g_ctx.fillStyle = '#070809'
        g_ctx.fillRect(s_shopOffsetX, s_shopOffsetY, s_shopOffsetX * 2 + s_menuTileSize/2, s_shopBottom - s_shopOffsetY + s_menuTileSize/2)
        this.sprite.drawCentredAt(g_ctx, s_shopOffsetX, s_shopOffsetY, 0, 0);
        this.sprite.drawCentredAt(g_ctx, g_canvas.width - s_shopOffsetX, s_shopOffsetY, 0, 0)
        this.sprite.drawCentredAt(g_ctx, s_shopOffsetX, s_shopBottom, 0, 0)
        this.sprite.drawCentredAt(g_ctx, g_canvas.width - s_shopOffsetX, s_shopBottom, 0, 0)
        for (let i = s_shopOffsetX + s_menuTileSize; i < g_canvas.width - s_shopOffsetX; i += s_menuTileSize) {
            this.sprite.animation = 'UP';
            this.sprite.updateFrame(0);
            this.sprite.drawCentredAt(g_ctx, i, s_shopOffsetY, 0, 0);
            this.sprite.animation = 'DOWN';
            this.sprite.updateFrame(0);
            this.sprite.drawCentredAt(g_ctx, i, s_shopBottom, 0, 0);
        }
        for (let i = s_shopOffsetY + s_menuTileSize; i < s_shopBottom - s_menuTileSize; i += s_menuTileSize) {
            this.sprite.animation = 'LEFT';
            this.sprite.updateFrame(0);
            this.sprite.drawCentredAt(g_ctx, s_shopOffsetX, i, 0, 0)
            this.sprite.animation = 'RIGHT';
            this.sprite.updateFrame(0);
            this.sprite.drawCentredAt(g_ctx, g_canvas.width - s_shopOffsetX, i, 0, 0)
        }
        g_ctx.restore();
    },

    drawTitle: function () {
        g_ctx.save()
        g_ctx.fillStyle = 'white'
        g_ctx.font = '15px PressStart2P'
        g_ctx.textAlign = 'center'
        g_ctx.fillText('Space Shop', s_shopOffsetX + (s_shopOffsetX * 2 + s_menuTileSize/2)/2, s_shopOffsetY + 50);
        this.sprite.animation = 'SQUARE';
        this.sprite.updateFrame(0);
        this.sprite.drawCentredAt(g_ctx, s_shopOffsetX + 230, s_shopOffsetY + 40, 0, 0);
        this.sprite.drawCentredAt(g_ctx, g_canvas.width - s_shopOffsetX - 240, s_shopOffsetY + 40, 0, 0)
        g_ctx.restore()
    },

    drawItems: function () {
        g_ctx.save()
        g_ctx.font = '12px PressStart2P'

        // Coins
        g_ctx.fillStyle = 'green'
        g_ctx.textAlign = 'right'
        g_ctx.fillText(s_coins + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 40)
        
        // Base Lives
        g_ctx.fillStyle = (s_menuSelection === 0) ? 'white' : 'grey';
        g_ctx.textAlign = 'left'
        g_ctx.fillText('Base Lives', s_shopOffsetX + 50, s_shopOffsetY + 90)
        g_ctx.fillStyle = 'green'
        g_ctx.textAlign = 'center'
        g_ctx.fillText(s_baseLives, s_shopOffsetX + 400, s_shopOffsetY + 90)
        g_ctx.fillStyle = 'blue'
        g_ctx.textAlign = 'right'
        if (s_baseLives !== s_livesMax) {
            g_ctx.fillText(s_baseLives * 150 + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 90)
        } else {
            g_ctx.fillText('MAX', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 90)
        }

        // Fire Rate
        g_ctx.textAlign = 'left'
        g_ctx.fillStyle = (s_menuSelection === 1) ? 'white' : 'grey';
        g_ctx.fillText('Fire Rate', s_shopOffsetX + 50, s_shopOffsetY + 120)
        g_ctx.fillStyle = 'green'
        g_ctx.textAlign = 'center'
        g_ctx.fillText(s_fireRatio, s_shopOffsetX + 400, s_shopOffsetY + 120)
        g_ctx.fillStyle = 'blue'
        g_ctx.textAlign = 'right'
        if (s_fireRate !== 10) {
            g_ctx.fillText(s_fireRatio * 500 + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 120)
        } else {
            g_ctx.fillText('MAX', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 120)
        }

        // Gun upgrade
        g_ctx.textAlign = 'left'
        g_ctx.fillStyle = (s_menuSelection === 2) ? 'white' : 'grey';
        g_ctx.fillText('Flamethrower', s_shopOffsetX + 50, s_shopOffsetY + 150)
        g_ctx.fillStyle = (s_menuSelection === 3) ? 'white' : 'grey';
        g_ctx.fillText('Triple Shot', s_shopOffsetX + 50, s_shopOffsetY + 180)
        g_ctx.fillStyle = (s_menuSelection === 4) ? 'white' : 'grey';
        g_ctx.fillText('Pierce Shot', s_shopOffsetX + 50, s_shopOffsetY + 210)

        if (s_firePowerup) {
            g_ctx.fillStyle = 'green'
            g_ctx.textAlign = 'center'
            g_ctx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 150)
        }
        g_ctx.fillStyle = 'blue'
        g_ctx.textAlign = 'right'
        g_ctx.fillText(1000 + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 150)
        if (s_triplePowerup) {
            g_ctx.fillStyle = 'green'
            g_ctx.textAlign = 'center'
            g_ctx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 180)
        }
        g_ctx.fillStyle = 'blue'
        g_ctx.textAlign = 'right'
        g_ctx.fillText(1000 + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 180)
        if (s_piercePowerup) {
            g_ctx.fillStyle = 'green'
            g_ctx.textAlign = 'center'
            g_ctx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 210)
        }
        g_ctx.fillStyle = 'blue'
        g_ctx.textAlign = 'right'
        g_ctx.fillText(1000 + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 210)

        // Warp to level
        g_ctx.textAlign = 'left'
        g_ctx.fillStyle = (s_menuSelection === 5) ? 'white' : 'grey';
        g_ctx.fillText('Warp to Alien Base', s_shopOffsetX + 50, s_shopOffsetY + 240)
        g_ctx.fillStyle = (s_menuSelection === 6) ? 'white' : 'grey';
        g_ctx.fillText('Warp to Level 3', s_shopOffsetX + 50, s_shopOffsetY + 270)
        g_ctx.fillStyle = (s_menuSelection === 7) ? 'white' : 'grey';
        g_ctx.fillText('Warp to Level 4', s_shopOffsetX + 50, s_shopOffsetY + 300)
        if (currentLevel === 0) {
            g_ctx.fillStyle = 'green'
            g_ctx.textAlign = 'center'
            g_ctx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 240)
        }
        g_ctx.fillStyle = 'blue'
        g_ctx.textAlign = 'right'
        g_ctx.fillText(2000 + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 240)
        if (currentLevel === 1) {
            g_ctx.fillStyle = 'green'
            g_ctx.textAlign = 'center'
            g_ctx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 270)
        }
        g_ctx.fillStyle = 'blue'
        g_ctx.textAlign = 'right'
        g_ctx.fillText(2000 + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 270)
        if (currentLevel === 2) {
            g_ctx.fillStyle = 'green'
            g_ctx.textAlign = 'center'
            g_ctx.fillText('Activated', s_shopOffsetX + 400, s_shopOffsetY + 300)
        }
        g_ctx.fillStyle = 'blue'
        g_ctx.textAlign = 'right'
        g_ctx.fillText(3000 + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 300)

        // Double jump
        g_ctx.textAlign = 'left'
        g_ctx.fillStyle = (s_menuSelection === 8) ? 'white' : 'grey';
        g_ctx.fillText('Double Jump', s_shopOffsetX + 50, s_shopOffsetY + 330)
        g_ctx.fillStyle = 'green'
        g_ctx.textAlign = 'center'
        g_ctx.fillText(Player.MAX_JUMPS, s_shopOffsetX + 400, s_shopOffsetY + 330)
        g_ctx.fillStyle = 'blue'
        g_ctx.textAlign = 'right'
        if (Player.MAX_JUMPS !== 3) {
            g_ctx.fillText(Player.MAX_JUMPS * 1000 + '§', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 330)
        }
        else {
            g_ctx.fillText('MAX', g_canvas.width - s_shopOffsetX  - 50, s_shopOffsetY + 330)
        }
        g_ctx.restore()
    },
}