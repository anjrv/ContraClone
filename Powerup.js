// ======
// Powerup
// ======

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Powerup(descr) {
  // Common inherited setup logic from Entity
  Character.call(this, descr);
  this.scale = 2;
  this.SPRITE_WIDTH = 32 * this.scale;
  this.SPRITE_HEIGHT = 16 * this.scale;

  //Sprite stuff
  this.sprite = g_sprites.powerups;
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

Powerup.prototype = Object.create(Character.prototype);
Powerup.prototype.constructor = Powerup;

// Initial, inheritable, default values
Powerup.prototype.rotation = 0;
Powerup.prototype.cx = 200;
Powerup.prototype.cy = 200;
Powerup.prototype.velX = 1;
Powerup.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Powerup.prototype.lifeSpan = 20000 / NOMINAL_UPDATE_INTERVAL;
Powerup.prototype.frame = 0;
Powerup.prototype.changeCounter = 2;
Powerup.prototype.changeBase = 2;

Powerup.prototype.update = function (du) {
<<<<<<< HEAD
    const playerLoc = this.shouldUpdate();
    if (!playerLoc) return;
    spatialManager.unregister(this);

    if (this.lifeSpan === 20000 / NOMINAL_UPDATE_INTERVAL) {
        this.sprite.animation = this.power;
        this.sprite.scale = this.scale
    }

    if (this.onGround) this.velX = 0;

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

    this.changeCounter -= du;
    util.changeSprite(this);
    // Handle collisions
    //
    const hitEntity = this.findHitEntity();
    if (hitEntity.isPlayer) {
      s_noPowerup = false;
      s_firePowerup = false;
      s_triplePowerup = false;
      s_piercePowerup = false;
      if (this.power === 'RED') s_firePowerup = true;
      else if (this.power === 'BLUE') s_triplePowerup = true;
      else if (this.power === 'GREEN') s_piercePowerup = true;
      m_powerup.play()
      return entityManager.KILL_ME_NOW;
    }

    this.prev_cx = this.cx;
    this.prev_cy = this.cy;

    this.computeSubStep(du, playerLoc);
    this.collideWithMap(du);

    spatialManager.register(this);
=======
  const playerLoc = this.shouldUpdate();
  if (!playerLoc) return;
  spatialManager.unregister(this);

  if (this.lifeSpan === 20000 / NOMINAL_UPDATE_INTERVAL) {
    this.sprite.animation = this.power;
    this.sprite.scale = this.scale;
  }

  if (this.onGround) this.velX = 0;

  this.lifeSpan -= du;
  if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

  this.changeCounter -= du;
  util.changeSprite(this);
  // Handle collisions
  //
  const hitEntity = this.findHitEntity();
  if (hitEntity.isPlayer) {
    noPowerup = false;
    firePowerup = false;
    triplePowerup = false;
    if (this.power === 'RED') firePowerup = true;
    else if (this.power === 'BLUE') triplePowerup = true;
    else if (this.power === 'GREEN') piercePowerup = true;
    m_powerup.play();
    return entityManager.KILL_ME_NOW;
  }

  this.prev_cx = this.cx;
  this.prev_cy = this.cy;

  this.computeSubStep(du, playerLoc);
  this.collideWithMap(du);

  spatialManager.register(this);
>>>>>>> ae2835c38b94f03c541476e1bac430c8c8da11d8
};

Powerup.prototype.computeSubStep = function (du, playerLoc) {
  let gravityAcc = this.computeGravity();
  this.applyAccel(0, gravityAcc, du);
};

Powerup.prototype.render = function (ctx) {
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, false);

  ctx.globalAlpha = 1;
};
