function Charger(descr) {
  Character.call(this, descr);

  this.scale = 2;
  const SPRITE_WIDTH = 20 * this.scale;
  const SPRITE_HEIGHT = 24 * this.scale;

  // Collisions
  this.collider = new Collider({
    type: 'Box',
    cx: this.cx,
    cy: this.cy,
    width: SPRITE_WIDTH,
    height: SPRITE_HEIGHT,
    offsetY: (worldMap.getTileSize() - SPRITE_HEIGHT) / 2,
  });

  // Direction 1 is right, -1 is left.
  // Some velocity stats that are faster than the player
  this.dirX = 1;
  this.hp = 1;
  this.rotation = 0;
  this.isPlayer = false;
  this.onGround = true;
  this.NOMINAL_ACC = 0.2;
  this.MAX_VEL = 12.0;
  this.MAX_TURNAROUND_FORCE = 5.0;
}

Charger.prototype = Object.create(Character.prototype);
Charger.prototype.constructor = Charger;

Charger.prototype.update = function (du) {
  const playerLoc = this.shouldUpdate();
  if (!playerLoc) return;

  spatialManager.unregister(this);

  if (this._isDeadNow) {
    // No sprite
    // entityManager.makeEnemyKillAnimation(
    //   this.cx,
    //   this.cy,
    //   this.sprite,
    //   this.collider.height,
    // );
    return entityManager.KILL_ME_NOW;
  }

  const hitEntity = this.findHitEntity();

  // Yeehaw the fucker
  if (hitEntity && hitEntity.isPlayer) {
    const canTakeHit = hitEntity.takeBulletHit;
    if (canTakeHit) canTakeHit.call(hitEntity);
    // return entityManager.KILL_ME_NOW;
  }

  this.prev_cx = this.cx;
  this.prev_cy = this.cy;
  this.computeSubStep(du, playerLoc);
  this.collideWithMap(du);

  spatialManager.register(this);
};

Charger.prototype.takeBulletHit = function () {
  this.hp -= 1;
  if (this.hp <= 0) this._isDeadNow = true;
};

Charger.prototype.computeHorizontalAccel = function (playerLoc) {
  let acceleration = 0;
  const playerX = playerLoc.cx;

  if (playerX < this.cx) {
    this.dirX = -1;

    acceleration -=
      this.NOMINAL_ACC *
      util.lerp(
        1.0,
        this.MAX_TURNAROUND_FORCE,
        (this.velX + this.MAX_VEL) / (2 * this.MAX_VEL),
      );
  }

  if (playerX > this.cx) {
    this.dirX = 1;
    acceleration +=
      this.NOMINAL_ACC *
      util.lerp(
        this.MAX_TURNAROUND_FORCE,
        1.0,
        (this.velX + this.MAX_VEL) / (2 * this.MAX_VEL),
      );
  }

  return acceleration;
};

Charger.prototype.handleJump = function (acc, currLoc, playerLoc) {
  if (!this.onGround) return acc;

  // Don't care about other stuff if player is close
  // Some weird fuckery to get this to behave somewhat reasonably
  const playerTile = worldMap.getIndeciesFromCoords(playerLoc.cx, playerLoc.cy);
  const myTile = worldMap.getIndeciesFromCoords(this.cx, this.cy);
  if (playerTile.row + 1 < myTile.row && Math.abs(playerLoc.cx - this.cx) < 100) {
    this.onGround = false;
    acc = -20.0;

    return acc;
  }

  const nextGround = worldMap.getTileType(
    currLoc.row + 1,
    currLoc.col + 1 * this.dirX,
  );

  const nextNextNextWall = worldMap.getTileType(
    currLoc.row,
    currLoc.col + 3 * this.dirX,
  );
  if (
    nextGround === worldMap.EMPTY_TILE ||
    nextNextNextWall !== worldMap.EMPTY_TILE
  ) {
    this.onGround = false;
    acc = -20.0;
  }

  return acc;
};

Charger.prototype.computeSubStep = function (du, playerLoc) {
  const currLoc = worldMap.getIndeciesFromCoords(this.cx, this.cy);

  let gravityAcc = this.computeGravity();

  let horizAcc = this.computeHorizontalAccel(playerLoc);
  gravityAcc = this.handleJump(gravityAcc, currLoc, playerLoc);

  this.applyAccel(horizAcc, gravityAcc, du);
};

Charger.prototype.render = function (ctx) {
  util.fillBoxCentered(
    ctx,
    this.cx,
    this.cy,
    this.collider.width,
    this.collider.height,
    'teal',
  );
  this.debugRender(ctx);
  return;

  if (!this.sprite.animation) return;
  this.sprite.scale = this.scale;
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(
    ctx,
    this.cx,
    this.cy,
    this.rotation,
    this.direction < 0,
  );
};

Charger.prototype.record = function (tag) {
  tag.setAttribute('type', this.constructor.name);
  tag.setAttribute('cx', this.cx);
  tag.setAttribute('cy', this.cy);
  tag.setAttribute('dirx', this.dirX);
  return tag;
};

Charger.parseRecord = function (record) {
  let cx = Number.parseFloat(record.attributes.cx.nodeValue);
  let cy = Number.parseFloat(record.attributes.cy.nodeValue);
  let dirX = Number.parseInt(record.attributes.dirx.nodeValue);
  return { cx, cy, dirX };
};
