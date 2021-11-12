// ======
// Coin
// ======

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Coin(descr) {
  // Common inherited setup logic from Entity
  Character.call(this, descr);

  this.scale = 1;
  this.SPRITE_WIDTH = 16 * this.scale;
  this.SPRITE_HEIGHT = 16 * this.scale;

  //Sprite stuff
  this.sprite = new Sprite(g_images.coins,12,4,16,16)
  this.sprite.animations = {
    GREEN: [12,13,14,15,16,17,18,19,20,21,22,23],
    GOLD: [ 24,25,26,27,28,29,30,31,32,33,34,35]
  }

  this.floor = 0;
  this.onGround = false;
  this.collider = new Collider({
    type: 'Box',
    cx: this.cx,
    cy: this.cy,
    width: this.SPRITE_WIDTH,
    height: this.SPRITE_HEIGHT,
    offsetY: 0,
  });
}

Coin.prototype = Object.create(Character.prototype);
Coin.prototype.constructor = Coin


// Initial, inheritable, default values
Coin.prototype.rotation = 0;
Coin.prototype.cx = 200;
Coin.prototype.cy = 200;
Coin.prototype.velX = 1;
Coin.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Coin.prototype.lifeSpan = 20000 / NOMINAL_UPDATE_INTERVAL;
Coin.prototype.frame = 0;
Coin.prototype.changeCounter = 2;
Coin.prototype.changeBase = 2;

Coin.prototype.update = function (du) {
    const playerLoc = this.shouldUpdate();
    if (!playerLoc) return;
    spatialManager.unregister(this);

    if (this.lifeSpan === 20000 / NOMINAL_UPDATE_INTERVAL) {
        this.sprite.animation = this.coinType;
        this.sprite.scale = (this.coinType === 'GREEN' ? 1 : 2)
        this.collider.offsetY = (this.coinType === 'GOLD' ? this.SPRITE_HEIGHT/2 : 0)
    }

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

    this.changeCounter -= du;
    util.changeSprite(this);
    // Handle collisions
    //
    const hitEntity = this.findHitEntity();
    if (hitEntity.isPlayer) {
      coins += (this.coinType === 'GREEN' ? 10 : 50);
      m_collect.play()
      return entityManager.KILL_ME_NOW;
    }

    if (this.onGround) this.velX = 0;
    this.prev_cx = this.cx;
    this.prev_cy = this.cy;

    this.computeSubStep(du, playerLoc);
    this.collideWithMap(du);

    spatialManager.register(this);
};

Coin.prototype.computeSubStep = function (du, playerLoc) {
    let gravityAcc = this.computeGravity();
    this.applyAccel(0, gravityAcc, du);
};

Coin.prototype.render = function (ctx) {
    this.sprite.updateFrame(this.frame || 0);
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, false);

    ctx.globalAlpha = 1;
}