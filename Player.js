function Player(descr) {
  Character.call(this, descr);
  this.speed = 1;
  this.jumps = 0;
  this.lives = 3;
  this.shootCountdown = -1;
  this.invincibleCooldown = -1;
  this.respawning = false;

  //Sprite stuff
  this.sprite = g_sprites.player;
  this.frame = 0;
  this.angle = 0;
  this.size = 46;
  this.sizeScale = 2 * this.size;
  this.realSize = g_sprites.player.sWidth * this.scale;
  this.realHalfSize = this.realSize / 2;
  this.floor = p_ground2;
  this.direction = 1;
  this.rotation = 0;
  this.shotId = 0;

  // Collisions
  this.collider = new Collider({
    type: 'Box',
    cx: 0,
    cy: 0,
    width: this.sizeScale * 0.4,
    height: this.sizeScale * 0.75,
    offsetY: this.sizeScale * 0.125,
  });

  // Direction 1 is right, -1 is left.
  this.dirX = 1;
  this.scale = p_scale;
  this.jumping = false;
  this.crouching = false;
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.KEY_LEFT = 'A'.charCodeAt(0);
Player.prototype.KEY_RIGHT = 'D'.charCodeAt(0);
Player.prototype.KEY_UP = 'W'.charCodeAt(0);
Player.prototype.KEY_DOWN = 'S'.charCodeAt(0);

Player.prototype.KEY_JUMP = ' '.charCodeAt(0);
Player.prototype.KEY_SHOOT = 'J'.charCodeAt(0);
Player.prototype.KEY_FLYUP = 'L'.charCodeAt(0);
Player.prototype.KEY_CROUCH = 16; // SHIFT

// Variables that bullets can use.
var p_velX;
var p_velY;
Player.prototype.update = function (du) {
  this.shootCountdown = this.shootCountdown < 0 ? this.shootCountdown : this.shootCountdown - du;
  this.invincibleCooldown = this.invincibleCooldown < 0 ? this.invincibleCooldown : this.invincibleCooldown - du;
  
  spatialManager.unregister(this);

  if (this._isDeadNow) return entityManager.KILL_ME_NOW;

  if (this.crouching) {
    this.collider.height = this.sizeScale * 0.55;
    this.collider.offsetY = this.sizeScale * 0.2;
    this.crouching = false;
  } else {
    this.collider.height = this.sizeScale * 0.75;
    this.collider.offsetY = this.sizeScale * 0.125;
  }

  this.computeSubStep(du);
  this.collideWithMap(du);
  this.changeSprite(du);
  this.maybeShoot();

  this.collider.cx = this.cx;
  this.collider.cy = this.cy;

  if (!this.onGround) this.rotation += 0.4 * du * this.direction;
  spatialManager.register(this);
};

Player.NOMINAL_ACC = 0.3;
Player.NOMINAL_FRICTION = 0.2;
Player.MAX_JUMPS = 2;
Player.MAX_VEL = 10;
Player.MAX_TURNAROUND_FORCE = 10.0;

Player.prototype.computeSubStep = function (du) {
  let gravityAcc = this.computeGravity();
  gravityAcc = Math.min(worldMap.getTileSize() * 0.8, gravityAcc);
  let acceleration = 0;

  if (this.respawning) {
    // Player is respawning, they are only affected by gravity
    this.applyAccel(-Player.NOMINAL_FRICTION * this.velX, gravityAcc, du);
    return;
  }

  if (keys[this.KEY_LEFT]) {
    this.direction = -1;
    acceleration -=
      Player.NOMINAL_ACC *
      util.lerp(
        1.0,
        Player.MAX_TURNAROUND_FORCE,
        (this.velX + Player.MAX_VEL) / (2 * Player.MAX_VEL)
      );
  } else if (keys[this.KEY_RIGHT]) {
    this.direction = 1;
    acceleration +=
      Player.NOMINAL_ACC *
      util.lerp(
        Player.MAX_TURNAROUND_FORCE,
        1.0,
        (this.velX + Player.MAX_VEL) / (2 * Player.MAX_VEL)
      );
  } else if (this.onGround) {
    acceleration -= Player.NOMINAL_FRICTION * this.velX;
  }

  if (!keys[this.KEY_JUMP] && this.jumping) {
    this.velY *= 0.5;
    this.jumping = false;
  }

  if (this.onGround) {
    this.jumps = 0;
  }

  if (keys[this.KEY_JUMP] && !this.jumping && this.jumps < Player.MAX_JUMPS) {
    this.verticalCollision = false;
    this.onGround = false;
    gravityAcc = -20.0;
    this.jumps++;
    this.jumping = true;
  }

  if (keys[this.KEY_FLYUP]) {
    this.cy -= 10;
  }

  this.applyAccel(acceleration, gravityAcc, du);

  this.collider.cx = this.cx;
  this.collider.cy = this.cy;
};

Player.prototype.maybeShoot = function () {
  // If player is respawning they can't shoot
  if (this.respawning) return; 

  if (keys[this.KEY_SHOOT]) {
    if (this.shootCountdown < 0) {
      this.shootCountdown = 10;
      // Calculate the direction of the bullet.
      let vX =
        this.velX === 0
          ? this.direction * Math.cos(this.angle)
          : Math.sign(this.velX) * Math.cos(this.angle);
      let vY = -Math.sin(this.angle);
      let dX = this.velX;
      if (this.velX === 0) dX = this.direction;
      let bulletAngle = Math.sign(dX) > 0 ? this.angle : -this.angle + Math.PI;
      m_laser.play();

      // let entityManager add a Bullet entity
      entityManager.firePlayerBullet(
        this.cx + (vX * this.sprite.sWidth) / 2,
        this.cy + (vY * this.sprite.sHeight) / 2,
        vX * g_bulletSpeed,
        vY * g_bulletSpeed,
        -bulletAngle,
      );
    }
  }
};

// Logic for taking a bullet hit
Player.prototype.takeBulletHit = function () {
  // If Player is invincible nothing happens
  if (this.invincibleCooldown > 0) return;

  // Player takes hit
  //this.lives--;
  this.invincibleCooldown = 100;
  this.respawning = true;

  // If Player looses all his lives, either respawn at beginning or let entityManager handle it
  if (this.lives === 0) this._isDeadNow = true;
};

// Maybe TODO later, make changeCounter adjusted to Speed
var p_changeCounter = 77;
var p_changeBase = p_changeCounter;

// Based on the action that the Player is performing, choose a sprite 
Player.prototype.changeSprite = function (du) {
  // A counter that changes the sprite when du * velocity reaches a certain number.

  if (this.invincibleCooldown > 0 
    && Math.floor(this.invincibleCooldown / 5) % 2) {
      this.sprite.animation = false;
      return;
    }
  if (this.respawning) {
    this.sprite.animation = "CROUCH";
    this.respawning = this.invincibleCooldown > 50;
    return;
  }

  p_changeCounter -= du * Math.abs(this.velX);
  if (p_changeCounter < 0) {
    this.frame += 1;
    p_changeCounter = p_changeBase;
  }

  this.angle = 0;

  if (Math.abs(this.velX) < 1 && this.onGround) {
    this.sprite.animation = 'IDLE';
  }

  let airborne = null;
  if (keys[this.KEY_RIGHT] || keys[this.KEY_LEFT]) {
    airborne = !this.onGround;
    if (this.onGround) this.sprite.animation = 'RUN_FORWARD';
    if (keys[this.KEY_UP]) {
      this.angle = Math.PI / 4;
      if (this.onGround) this.sprite.animation += '_UP';
    }
    if (keys[this.KEY_DOWN]) {
      this.angle = -Math.PI / 4;
      if (this.onGround) this.sprite.animation += '_DOWN';
    }
    if (this.onGround) return;
  }

  if (keys[this.KEY_DOWN] && !airborne) {
    this.angle = -Math.PI / 2;
    if (this.onGround) {
      this.sprite.animation = 'LOOK_DOWN';
      return;
    }
  }

  if (keys[this.KEY_UP] && !airborne) {
    this.angle = Math.PI / 2;
    if (this.onGround) {
      this.sprite.animation = 'LOOK_UP';
      return;
    }
  }

  if (!this.onGround) {
    this.sprite.animation = 'JUMP';
    return;
  }

  if (keys[this.KEY_CROUCH]) {
    this.sprite.animation = 'CROUCH';
    this.crouching = true;
  }
};

// Draws the Player on the ctx
Player.prototype.render = function (ctx) {
  if (!this.sprite.animation) return; // if there is no animation don't render

  this.sprite.scale = this.scale;
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, this.direction < 0);

  this.debugRender(ctx);
}

Player.prototype.record = function (tag) {
  tag.setAttribute('type', this.constructor.name);
  tag.setAttribute('posx', this.cx);
  tag.setAttribute('posy', this.cy);
  tag.setAttribute('velx', this.velX);
  tag.setAttribute('vely', this.velY);
  tag.setAttribute('jumps', this.jumps);
  tag.setAttribute('dirx', this.dirX);
  return tag;
};

Player.parseRecord = function (record) {
  let cx = Number.parseFloat(record.attributes.posx.nodeValue);
  let cy = Number.parseFloat(record.attributes.posy.nodeValue);
  let velX = Number.parseFloat(record.attributes.velx.nodeValue);
  let velY = Number.parseFloat(record.attributes.vely.nodeValue);
  let jumps = Number.parseInt(record.attributes.jumps.nodeValue);
  let dirX = Number.parseInt(record.attributes.dirx.nodeValue);

  return { cx, cy, velX, velY, jumps, dirX };
};
