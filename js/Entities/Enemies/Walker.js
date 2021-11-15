function Walker(descr) {
  Character.call(this, descr);
  this.scale = this.big ? 3 : 2;
  this.SPRITE_WIDTH = 30 * this.scale;
  this.SPRITE_HEIGHT = 38 * this.scale;
  this.sprite = new Sprite(g_images.walker, 7, 2, 30, 38);
  this.sprite.animations = {
    IDLE: [0],
    MOVE: [0, 1, 2, 3, 4, 5],
    SHOOT: [6],
    HIT_MOVE: [7, 8, 9, 10, 11, 12],
    HIT_SHOOT: [13],
    DEATH: [3, 10],
  };

  this.frame = 0;
  this.changeCounter = 5;
  this.changeBase = this.changeCounter;
  this.sprite.animation = 'IDLE';
  this.cy += (worldMap.getTileSize() - this.SPRITE_HEIGHT) / 2;

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
  this.dirX = -1;
  this.movSpeed = 1;
  this.shotCooldown = -1;
  this.shotId = 1;
  this.hp = this.big ? 16 : 4;
  this.greenCoin = this.big ? 4 : 2;
  this.goldCoin = this.big ? 2 : 1;
  this.spriteCooldown = 0;
}

Walker.prototype = Object.create(Character.prototype);
Walker.prototype.constructor = Walker;

Walker.prototype.update = function (du) {
  const playerLoc = this.shouldUpdate();
  if (!playerLoc) return;

  this.shotCooldown -= du;
  this.spriteCooldown -= du;

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

  this.dirX = playerLoc.cx < this.cx ? -1 : 1;
  if (playerLoc.sqDist > Math.pow(g_aggroRange, 2) || this.shotCooldown > 0) {
    this.computeSubStep(du);
  } else {
    this.attack(du);
  }

  this.collider.cx = this.cx;
  this.collider.cy = this.cy;

  spatialManager.register(this);
};

Walker.prototype.attack = function (du) {
  this.spriteCooldown = 5;

  this.sprite.animation = this.hit ? 'HIT_SHOOT' : 'SHOOT';

  this.changeCounter -= du;
  if (this.changeCounter < 0) {
    this.changeCounter = this.changeBase;
    this.hit = false;
  }

  if (this.shotCooldown > 0) return;
  this.shotCooldown = 60;


  entityManager.fireEnemyBullet(
    this.cx,
    this.cy + this.SPRITE_HEIGHT * 0.15, // Shift point of shot down
    g_bulletSpeed * this.dirX,
    0,
    this.dirX === -1 ? Math.PI : 0,
  );
};

Walker.prototype.takeBulletHit = function () {
  this.hp -= 1;
  this.hit = true;
  if (this.hp <= 0) this._isDeadNow = true;
};

Walker.prototype.computeSubStep = function (du) {
  const currLoc = worldMap.getIndeciesFromCoords(this.cx, this.cy);

  if (this.spriteCooldown <= 0)
    this.sprite.animation = this.hit ? 'HIT_MOVE' : 'MOVE';
  this.changeCounter -= du;
  if (this.changeCounter < 0) {
    this.frame++;
    this.changeCounter = this.changeBase;
    this.hit = false;
  }

  // We're goin left
  if (this.dirX < 0) {
    const left = worldMap.getTileType(currLoc.row, currLoc.col - 1);

    // Slight hack to fit bigboy in the world
    const leftDown = worldMap.getTileType(currLoc.row + (this.big ? 2 : 1), currLoc.col - 1);

    if (!(left === worldMap.EMPTY_TILE && leftDown !== worldMap.EMPTY_TILE))
      this.dirX *= -1;
  }

  // We're goin right
  if (this.dirX > 0) {
    const right = worldMap.getTileType(currLoc.row, currLoc.col + 1);

    // Same hack
    const rightDown = worldMap.getTileType(currLoc.row + (this.big ? 2 : 1), currLoc.col + 1);

    if (!(right === worldMap.EMPTY_TILE && rightDown !== worldMap.EMPTY_TILE))
      this.dirX *= -1;
  }

  this.cx += this.dirX * this.movSpeed * du;
};

Walker.prototype.render = function (ctx) {
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

Walker.prototype.record = function (tag) {
  tag.setAttribute('type', this.constructor.name);
  tag.setAttribute('cx', this.cx);
  tag.setAttribute('cy', this.cy);
  tag.setAttribute('dirx', this.dirX);
  return tag;
};

Walker.parseRecord = function (record) {
  let cx = Number.parseFloat(record.attributes.cx.nodeValue);
  let cy = Number.parseFloat(record.attributes.cy.nodeValue);
  let dirX = Number.parseInt(record.attributes.dirx.nodeValue);
  return { cx, cy, dirX };
};
