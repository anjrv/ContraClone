// ======
// Explosion
// ======

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Explosion(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);
}

Explosion.prototype = new Entity();
Explosion.prototype.constructor = Explosion;

// Initial, inheritable, default values
Explosion.prototype.rotation = 0;
Explosion.prototype.cx = 200;
Explosion.prototype.cy = 200;
Explosion.prototype.velX = 0.5;
Explosion.prototype.velY = -1;

// Convert times from milliseconds to "nominal" time units.
Explosion.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

Explosion.prototype.changeCounter = 7;
Explosion.prototype.changeBase = 7;
Explosion.prototype.frame = 0;
Explosion.prototype.sprite = g_sprites.explosion;
Explosion.prototype.rSize = 26;

Explosion.prototype.update = function (du) {
    spatialManager.unregister(this);

    if (!this.scale) this.scale = this.size / this.rSize;
  
    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW;
    }
  
    this.changeCounter -= du;
    if (this.changeCounter < 0) {
        this.frame++;
        this.changeCounter = this.changeBase;
    }
    spatialManager.register(this);
  };

Explosion.prototype.render = function (ctx) {
  if (!this.sprite.animation) return;
  this.sprite.scale = this.scale;
  this.sprite.animation = 'EXPLODE';
  this.sprite.updateFrame(this.frame);
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, false);
};