'use strict';

function Charger(descr) {
  Character.call(this, descr);

  this.scale = 2;
  this.SPRITE_WIDTH = 20 * this.scale;
  this.SPRITE_HEIGHT = 23 * this.scale;
  this.sprite = new Sprite(g_images.charger, 5, 2, 20, 23);
  this.sprite.animations = {
    IDLE: [0],
    MOVE: [0, 1, 2, 3],
    JUMP: [4],
    HIT_MOVE: [5, 6, 7, 8],
    HIT_JUMP: [9],
    DEATH: [4, 9],
  };

  this.frame = 0;
  this.changeCounter = 3;
  this.changeBase = this.changeCounter;
  this.sprite.animation = 'IDLE';

  // Collisions
  this.collider = new Collider({
    type: 'Box',
    cx: this.cx,
    cy: this.cy,
    width: this.SPRITE_WIDTH,
    height: this.SPRITE_HEIGHT,
    offsetY: 0,
  });

  // Direction 1 is right, -1 is left.
  // Some velocity stats that are faster than the player
  this.dirX = 1;
  this.hp = 1;
  this.rotation = 0;
  this.isPlayer = false;
  this.onGround = true;
  this.stuckCheck = 0;
  this.NOMINAL_ACC = 0.2;
  this.MAX_VEL = 5.0;
  this.MAX_TURNAROUND_FORCE = 5.0;
  this.greenCoin = 2;
  this.goldCoin = 1;
}

Charger.prototype = Object.create(Character.prototype);
Charger.prototype.constructor = Charger;

Charger.prototype.update = function (du) {
  const playerLoc = this.shouldUpdate();
  if (!playerLoc) return;

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

  const hitEntity = this.findHitEntity();

  // Yeehaw the fucker
  if (hitEntity && hitEntity.isPlayer) {
    const canTakeHit = hitEntity.takeBulletHit;
    if (canTakeHit) canTakeHit.call(hitEntity);
    // return entityManager.KILL_ME_NOW; Could make this guy suicide on impact?
  }
  this.prev_cx = this.cx;
  this.prev_cy = this.cy;
  this.computeSubStep(du, playerLoc);
  this.collideWithMap(du);

  if (this.prev_cx === this.cx) this.stuckCheck++;

  spatialManager.register(this);
};

Charger.prototype.takeBulletHit = function () {
  this.hp -= 1;
  this.hit = true;
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

Charger.prototype.handleJump = function (acc, currLoc, playerLoc, du) {
  if (!this.onGround) return acc;

  // I'm fucking stuck
  if (this.stuckCheck > 20) {
    this.onGround = false;
    this.stuckCheck = 0;
    acc = -20.0 / du;

    return acc;
  }

  // Don't care about other stuff if player is close
  // Some weird fuckery to get this to behave somewhat reasonably
  const playerTile = worldMap.getIndeciesFromCoords(playerLoc.cx, playerLoc.cy);
  if (
    playerTile.row + 1 < currLoc.row &&
    Math.abs(playerLoc.cx - this.cx) < 100
  ) {
    this.onGround = false;
    acc = -20.0 / du;

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
    acc = -20.0 / du;
  }

  return acc;
};

Charger.prototype.computeSubStep = function (du, playerLoc) {
  const currLoc = worldMap.getIndeciesFromCoords(this.cx, this.cy);

  this.sprite.animation = this.hit ? 'HIT_MOVE' : 'MOVE';
  if (!this.onGround) this.sprite.animation = this.hit ? 'HIT_JUMP' : 'JUMP';

  this.changeCounter -= du;
  if (this.changeCounter < 0) {
    this.frame++;
    this.changeCounter = this.changeBase;
    this.hit = false;
  }

  let gravityAcc = this.computeGravity();

  let horizAcc = this.computeHorizontalAccel(playerLoc);
  gravityAcc = this.handleJump(gravityAcc, currLoc, playerLoc, du);

  this.applyAccel(horizAcc, gravityAcc, du);
};

Charger.prototype.render = function (ctx) {
  if (!this.sprite.animation) return;
  this.sprite.scale = this.scale;
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(
    ctx,
    this.cx,
    this.cy,
    this.rotation,
    this.dirX < 0,
  );
  //this.debugRender(ctx);
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
