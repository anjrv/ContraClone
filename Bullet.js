// ======
// BULLET
// ======

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);

  //Sprite stuff
  this.sprite = g_sprites.projectiles;
  this.spritePosition;
  if (this.shootH) this.spritePosition = 0;
  if (this.shootV) this.spritePosition = 12;
  if (this.shootDU || this.shootDD) this.spritePosition = 6;
  this.spriteWidth = 28;
  this.spriteHeight = 28;
  this.ssbX = this.spritePosition * this.spriteWidth;
  this.ssbY = 46;
  this.spriteNumber = 13;
  this.spriteScale = 1;
  this.ssHeight = 1024;
  this.floor = 0;
  this.realSize = this.spriteWidth*this.spriteScale;

  // Make a noise when I am created (i.e. fired)
  //this.fireSound.play();

  /*
    // Diagnostics to check inheritance stuff
    this._bulletProperty = true;
    console.dir(this);
*/
}

Bullet.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Bullet.prototype.fireSound = new Audio('sounds/bulletFire.ogg');
Bullet.prototype.zappedSound = new Audio('sounds/bulletZapped.ogg');

// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function (du) {
  spatialManager.unregister(this);

  this.lifeSpan -= du;
  if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

  this.cx += this.velX * du - p_velX;
  this.cy += this.velY * du - p_velY;

  this.rotation += 1 * du;
  this.rotation = util.wrapRange(this.rotation, 0, consts.FULL_CIRCLE);

  // TODO? NO, ACTUALLY, I JUST DID THIS BIT FOR YOU! :-)
  //
  // Handle collisions
  //
  const hitEntity = this.findHitEntity();
  if (hitEntity) {
    const canTakeHit = hitEntity.takeBulletHit;
    if (canTakeHit) canTakeHit.call(hitEntity);
    return entityManager.KILL_ME_NOW;
  }

  // TODO: YOUR STUFF HERE! --- (Re-)Register
  spatialManager.register(this);
};

Bullet.prototype.getRadius = function () {
  return 4;
};

Bullet.prototype.takeBulletHit = function () {
  this.kill();

  // Make a noise when I am zapped by another bullet
  this.zappedSound.play();
};

Bullet.prototype.render = function (ctx) {
  const fadeThresh = Bullet.prototype.lifeSpan / 3;

  if (this.lifeSpan < fadeThresh) {
    ctx.globalAlpha = this.lifeSpan / fadeThresh;
  }

  this.sprite.drawCentredAt(ctx, this.cx, this.cy, 0, this, this.yDir);

  ctx.globalAlpha = 1;
};
