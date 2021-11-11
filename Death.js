// ======
// DEATH
// ======

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Death(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);
}

Death.prototype = new Entity();
Death.prototype.constructor = Death;

// Initial, inheritable, default values
Death.prototype.rotation = 0;
Death.prototype.cx = 200;
Death.prototype.cy = 200;
Death.prototype.velX = 0.5;
Death.prototype.velY = -1;
Death.prototype.changeCounter = 3;
Death.prototype.changeBase = 3;
Death.prototype.frame = 0;

// Convert times from milliseconds to "nominal" time units.
Death.prototype.lifeSpan = 300 / NOMINAL_UPDATE_INTERVAL;


Death.prototype.update = function (du) {
    spatialManager.unregister(this);
  
    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        entityManager.createExplosion(this.cx,this.cy,this.height);
        return entityManager.KILL_ME_NOW;
    }
  
    this.changeCounter -= du;
    if (this.changeCounter < 0) {
      this.frame++;
      this.changeCounter = this.changeBase;
    }
    const nextX = this.cx + this.velX * du;
    const nextY = this.cy + this.velY * du;
  
    this.cx = nextX;
    this.cy = nextY;
  
    spatialManager.register(this);
  };

Death.prototype.render = function (ctx) {
  this.sprite.animation = 'DEATH';
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, false);

  ctx.globalAlpha = 1;
};