function Patrol(descr) {
  Character.call(this, descr);
  this.sprite = new Sprite(g_images.enemies, 16, 1, 26, 26)
  this.sprite.animations = {
    IDLE: [0],
    MOVE: [0,1,2,3,4,5,6,7],
    SHOOT: [0],
    DEATH: [6,14],
    HIT_MOVE: [8,9,10,11,12,13,14,15],
    HIT_SHOOT: [8],
  };
  this.scale = 2;
  this.frame = 0;
  this.changeCounter = 5;
  this.changeBase = this.changeCounter;
  this.sprite.animation = 'IDLE';

  const SPRITE_SIZE = 26 * this.scale;
  this.cy += (worldMap.getTileSize() - SPRITE_SIZE) / 2;

  // Collisions
  this.collider = new Collider({
    type: 'Box',
    cx: this.cx,
    cy: this.cy,
    width: SPRITE_SIZE,
    height: SPRITE_SIZE,
    offsetY: 0,
  });

  // Direction 1 is right, -1 is left.
  this.dirX = 1;
  this.movSpeed = 1;
  this.shotCooldown = -1;
  this.shotId = 1;
  this.hp = 2;
}

Patrol.prototype = Object.create(Character.prototype);
Patrol.prototype.constructor = Patrol;

Patrol.prototype.update = function (du) {
  const playerLoc = this.shouldUpdate();
  if (!playerLoc) return;

  this.shotCooldown -= du;

  spatialManager.unregister(this);

  if (this._isDeadNow) {
    console.log(g_sprites.patrol)
    entityManager.makeEnemyKillAnimation(this.cx, this.cy, this.sprite, this.collider.height);
    return entityManager.KILL_ME_NOW;
   
  }

  if (playerLoc.sqDist > Math.pow(g_aggroRange, 2)) {
    this.computeSubStep(du);
  } else {
    this.attack(playerLoc, du);
  }

  this.collider.cx = this.cx;
  this.collider.cy = this.cy;

  spatialManager.register(this);
};

Patrol.prototype.attack = function (playerLoc, du) {
  this.sprite.animation = (this.hit) ? 'HIT_SHOOT' : 'SHOOT';

  this.changeCounter -= du;
  if (this.changeCounter < 0) {
    this.changeCounter = this.changeBase;
    this.hit = false;
  }

  if (this.shotCooldown > 0) return;
  this.shotCooldown = 100;

  const angle = util.angle(this.cx, this.cy, playerLoc.cx, playerLoc.cy)
  let vX = Math.cos(angle);
  let vY = Math.sin(angle);
  this.direction = (vX < 0) ? 1 : -1;


  entityManager.fireEnemyBullet(
    this.cx,
    this.cy,
    vX * g_bulletSpeed,
    vY * g_bulletSpeed,
    angle 
  );
};

Patrol.prototype.takeBulletHit = function () {
  this.hp -= 1;
  this.hit = true;
  if (this.hp <= 0) this._isDeadNow = true;
};

Patrol.prototype.computeSubStep = function (du) {
  const currLoc = worldMap.getIndeciesFromCoords(this.cx, this.cy);

  this.sprite.animation = (this.hit) ? 'HIT_MOVE' : 'MOVE';
  this.changeCounter -= du;
  if (this.changeCounter < 0) {
    this.frame++;
    this.changeCounter = this.changeBase;
    this.hit = false;
  }

  // We're goin left
  if (this.dirX < 0) {
    const left = worldMap.getTileType(currLoc.row, currLoc.col - 1);
    const leftDown = worldMap.getTileType(currLoc.row + 1, currLoc.col - 1);

    if (!(left === worldMap.EMPTY_TILE && leftDown !== worldMap.EMPTY_TILE)) this.dirX *= -1;
    this.direction = 1;
  }

  // We're goin right
  if (this.dirX > 0) {
    const right = worldMap.getTileType(currLoc.row, currLoc.col + 1);
    const rightDown = worldMap.getTileType(currLoc.row + 1, currLoc.col + 1);

    if (!(right === worldMap.EMPTY_TILE && rightDown !== worldMap.EMPTY_TILE)) this.dirX *= -1;
    this.direction = -1;
  }

  this.cx += this.dirX * this.movSpeed * du;

};

Patrol.prototype.render = function (ctx) {
  if (!this.sprite.animation) return;
  this.sprite.scale = this.scale;
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, this.direction < 0);
  this.debugRender(ctx);
};

Patrol.prototype.record = function (tag) {
  tag.setAttribute('type', this.constructor.name);
  tag.setAttribute('cx', this.cx);
  tag.setAttribute('cy', this.cy);
  tag.setAttribute('dirx', this.dirX);
  return tag;
};

Patrol.parseRecord = function (record) {
  let cx = Number.parseFloat(record.attributes.cx.nodeValue);
  let cy = Number.parseFloat(record.attributes.cy.nodeValue);
  let dirX = Number.parseInt(record.attributes.dirx.nodeValue);
  return { cx, cy, dirX };
};
