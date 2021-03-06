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
  this.floor = 0;
  this.collider = new Collider({
    type: 'Circle',
    cx: this.cx,
    cy: this.cy,
    radius: this.sprite.sWidth / 2,
  });

  /*
    // Diagnostics to check inheritance stuff
    this._bulletProperty = true;
    console.dir(this);
  */
}

Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;

// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;
Bullet.prototype.changeCounter = 3;
Bullet.prototype.changeBase = 3;
Bullet.prototype.frame = 0;

Bullet.prototype.update = function (du) {
  if (this.lifeSpan === 3000 / NOMINAL_UPDATE_INTERVAL) {
    if (this.type === 'FIREBULLET') {
      this.lifeSpan = 300 / NOMINAL_UPDATE_INTERVAL;
    }
    if (this.type === 'PIERCEBULLET') {
      this.changeCounter = 2;
      this.changeBase = 2;
    }
  }
  spatialManager.unregister(this);

  this.lifeSpan -= du;
  if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

  const nextX = this.cx + this.velX * du;
  const nextY = this.cy + this.velY * du;

  this.cx = nextX;
  this.cy = nextY;

  this.collider.cx = this.cx;
  this.collider.cy = this.cy;

  // Handle collisions
  //
  const hitEntity = this.findHitEntity();

  if (
    hitEntity &&
    hitEntity.shotId !== this.owner &&
    hitEntity.constructor.name !== 'Bullet'
  ) {
    const canTakeHit = hitEntity.takeBulletHit;
    if (canTakeHit) canTakeHit.call(hitEntity);
    if (this.type !== 'PIERCEBULLET') return entityManager.KILL_ME_NOW;
  }

  if (this.type === 'FIREBULLET' || this.type === 'PIERCEBULLET') {
    this.changeCounter -= du;
    if (this.changeCounter < 0) {
      this.frame++;
      this.changeCounter = this.changeBase;
    }
  }

  spatialManager.register(this);
};

Bullet.prototype.getRadius = function () {
  return 4;
};

Bullet.prototype.takeBulletHit = false;

Bullet.prototype.render = function (ctx) {
  this.sprite.animation = this.anim;
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, false);

  ctx.globalAlpha = 1;
};

Bullet.prototype.record = function (tag) {
  tag.setAttribute('type', this.constructor.name);
  tag.setAttribute('posx', this.cx);
  tag.setAttribute('posy', this.cy);
  tag.setAttribute('velx', this.velX);
  tag.setAttribute('vely', this.velY);
  tag.setAttribute('shootv', this.shootV);
  tag.setAttribute('shooth', this.shootH);
  tag.setAttribute('shootdu', this.shootDU);
  tag.setAttribute('shootdd', this.shootDD);
  tag.setAttribute('dirx', this.dirX);
  tag.setAttribute('diry', this.dirY);
  tag.setAttribute('ydir', this.yDir);

  return tag;
};

Bullet.parseRecord = function (record) {
  let cx = Number.parseFloat(record.attributes.posx.nodeValue);
  let cy = Number.parseFloat(record.attributes.posy.nodeValue);
  let velX = Number.parseFloat(record.attributes.velx.nodeValue);
  let velY = Number.parseFloat(record.attributes.vely.nodeValue);

  let shootV = record.attributes.shootv.nodeValue === 'true';
  let shootH = record.attributes.shooth.nodeValue === 'true';
  let shootDU = record.attributes.shootdu.nodeValue === 'true';
  let shootDD = record.attributes.shootdd.nodeValue === 'true';
  let yDir = Number.parseInt(record.attributes.ydir.nodeValue);
  let dirX = Number.parseInt(record.attributes.dirx.nodeValue);
  let dirY = Number.parseInt(record.attributes.diry.nodeValue);

  return {
    cx,
    cy,
    velX,
    velY,
    shootV,
    shootH,
    shootDU,
    shootDD,
    yDir,
    dirX,
    dirY,
  };
};
