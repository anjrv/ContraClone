function Pursuer(descr) {
  Character.call(this, descr);

  this.sprite = new Sprite(g_images.pursuer, 4, 2, 68, 60);
  this.sprite.animations = {
    IDLE: [0, 1],
    MOVE: [0, 1],
    SHOOT: [2, 3],
    HIT_MOVE: [4, 5],
    HIT_SHOOT: [6, 7],
    DEATH: [0, 4],
  };
  this.scale = 2;
  this.frame = 0;
  this.changeCounter = 5;
  this.changeBase = this.changeCounter;
  this.sprite.animation = 'IDLE';
  this.SPRITE_WIDTH = 68 * this.scale;
  this.SPRITE_HEIGHT = 60 * this.scale;
  this.greenCoin = 1;
  this.goldCoin = 3;

  // Collisions
  this.collider = new Collider({
    type: 'Box',
    cx: this.cx,
    cy: this.cy,
    width: this.SPRITE_WIDTH,
    height: this.SPRITE_HEIGHT,
    offsetY: (worldMap.getTileSize() - this.SPRITE_HEIGHT) / 2,
  });

  // Direction 1 is right, -1 is left.
  this.dirX = 1;
  this.hp = 5;
  this.rotation = 0;
  this.isPlayer = false;
  this.shotCooldown = -1;
  this.shotId = 1;
  this.NOMINAL_ACC = 0.2;
  this.MAX_VEL = 10.0;
  this.MAX_TURNAROUND_FORCE = 6.0;
  this.KITING_DISTANCE = 300;
}

Pursuer.prototype = Object.create(Character.prototype);
Pursuer.prototype.constructor = Pursuer;

Pursuer.prototype.update = function (du) {
  const playerLoc = this.shouldUpdate();
  if (!playerLoc) return;

  this.shotCooldown -= du;

  spatialManager.unregister(this);

  if (this._isDeadNow) {
    entityManager.makeEnemyKillAnimation(
      this.cx,
      this.cy,
      this.sprite,
      this.collider.height,
      this.greenCoin,
      this.goldCoin,
    );
    return entityManager.KILL_ME_NOW;
  }

  this.prev_cx = this.cx;
  this.prev_cy = this.cy;
  this.computeSubStep(du, playerLoc);

  if (Math.abs(this.cy - playerLoc.cy) < 50) {
    this.attack();
  }

  spatialManager.register(this);
};

Pursuer.prototype.takeBulletHit = function () {
  this.hp -= 1;
  this.hit = true;
  if (this.hp <= 0) this._isDeadNow = true;
};

Pursuer.prototype.computeHorizontalAccel = function (playerLoc) {
  let acceleration = 0;
  const playerX = playerLoc.cx;
  const xDiff = Math.abs(playerX - this.cx);

  if (playerX < this.cx) {
    this.dirX = -1;

    if (xDiff < this.KITING_DISTANCE) {
      acceleration +=
        this.NOMINAL_ACC *
        util.lerp(
          this.MAX_TURNAROUND_FORCE,
          1.0,
          (this.velX + this.MAX_VEL) / (2 * this.MAX_VEL),
        );
    }

    if (xDiff > this.KITING_DISTANCE) {
      acceleration -=
        this.NOMINAL_ACC *
        util.lerp(
          1.0,
          this.MAX_TURNAROUND_FORCE,
          (this.velX + this.MAX_VEL) / (2 * this.MAX_VEL),
        );
    }
  }

  if (playerX > this.cx) {
    this.dirX = 1;

    if (xDiff < this.KITING_DISTANCE) {
      acceleration -=
        this.NOMINAL_ACC *
        util.lerp(
          1.0,
          this.MAX_TURNAROUND_FORCE,
          (this.velX + this.MAX_VEL) / (2 * this.MAX_VEL),
        );
    }

    if (xDiff > this.KITING_DISTANCE) {
      acceleration +=
        this.NOMINAL_ACC *
        util.lerp(
          this.MAX_TURNAROUND_FORCE,
          1.0,
          (this.velX + this.MAX_VEL) / (2 * this.MAX_VEL),
        );
    }
  }

  return acceleration;
};

Pursuer.prototype.computeVerticalAccel = function (playerLoc) {
  let acceleration = 0;
  const playerY = playerLoc.cy;

  if (playerY < this.cy - this.SPRITE_HEIGHT * 0.2) {
    acceleration -=
      this.NOMINAL_ACC *
      util.lerp(
        1.0,
        this.MAX_TURNAROUND_FORCE,
        (this.velY + this.MAX_VEL) / (2 * this.MAX_VEL),
      );
  }

  if (playerY > this.cy - this.SPRITE_HEIGHT * 0.2) {
    acceleration +=
      this.NOMINAL_ACC *
      util.lerp(
        this.MAX_TURNAROUND_FORCE,
        1.0,
        (this.velY + this.MAX_VEL) / (2 * this.MAX_VEL),
      );
  }

  return acceleration;
};

Pursuer.prototype.computeSubStep = function (du, playerLoc) {
  const horizAcc = this.computeHorizontalAccel(playerLoc);
  const vertAcc = this.computeVerticalAccel(playerLoc);

  this.sprite.animation = this.hit ? 'HIT_MOVE' : 'MOVE';
  this.changeCounter -= du;
  if (this.changeCounter < 0) {
    this.frame++;
    this.changeCounter = this.changeBase;
    this.hit = false;
  }

  this.applyAccel(horizAcc, vertAcc, du);
};

Pursuer.prototype.attack = function (du) {
  if (this.shotCooldown > 0) return;
  this.shotCooldown = 100;
  this.isShooting = true;

  entityManager.fireEnemyBullet(
    this.cx + (this.dirX * this.SPRITE_WIDTH * 0.4),
    this.cy - this.SPRITE_HEIGHT * 0.2,
    g_bulletSpeed * this.dirX,
    0,
    this.dirX > 0 ? 0 : Math.PI,
  );
};

Pursuer.prototype.render = function (ctx) {
  if (!this.sprite.animation) return;
  this.sprite.scale = this.scale;
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(
    ctx,
    this.cx,
    this.cy,
    this.rotation,
    this.dirX > 0,
  );
  this.debugRender(ctx);
};

Pursuer.prototype.record = function (tag) {
  tag.setAttribute('type', this.constructor.name);
  tag.setAttribute('cx', this.cx);
  tag.setAttribute('cy', this.cy);
  tag.setAttribute('dirx', this.dirX);
  return tag;
};

Pursuer.parseRecord = function (record) {
  let cx = Number.parseFloat(record.attributes.cx.nodeValue);
  let cy = Number.parseFloat(record.attributes.cy.nodeValue);
  let dirX = Number.parseInt(record.attributes.dirx.nodeValue);
  return { cx, cy, dirX };
};
