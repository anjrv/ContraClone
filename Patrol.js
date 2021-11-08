function Patrol(descr) {
  Character.call(this, descr);

  // Collisions
  this.collider = new Collider({
    type: "Box",
    cx: this.cx,
    cy: this.cy,
    width: p_realSize / 2,
    height: p_realSize / 2,
    offsetY: 0
  });

  // Direction 1 is right, -1 is left.
  this.dirX = this.dirX || 1;
  this.movSpeed = this.movSpeed || 1;
}

Patrol.prototype = Object.create(Character.prototype);
Patrol.prototype.constructor = Patrol;

Patrol.prototype.update = function (du) {

  spatialManager.unregister(this);

  if (this._isDeadNow) return entityManager.KILL_ME_NOW;

  this.computeSubStep(du);
  
  this.collider.cx = this.cx;
  this.collider.cy = this.cy;

  spatialManager.register(this);
};

Patrol.prototype.computeSubStep = function (du) {
  const currLoc = worldMap.getIndeciesFromCoords(this.cx, this.cy);

  // We're goin left
  if (this.dirX < 0) {
    const left = worldMap.getTileType(currLoc.row, currLoc.col - 1);
    const leftDown = worldMap.getTileType(currLoc.row + 1, currLoc.col - 1);

    if (!(left === '  ' && leftDown !== '  ')) this.dirX *= -1;
  }

  // We're goin right
  if (this.dirX > 0) {
    const right = worldMap.getTileType(currLoc.row, currLoc.col + 1);
    const rightDown = worldMap.getTileType(currLoc.row + 1, currLoc.col + 1);

    if (!(right === '  ' && rightDown !== '  ')) this.dirX *= -1;
  }

  this.cx += this.dirX * this.movSpeed * du;
};

Patrol.prototype.render = function (ctx) {
  util.fillBoxCentered(ctx, this.cx, this.cy, p_realSize / 2, p_realSize / 2 ,'teal');
  this.debugRender(ctx);
}

Patrol.prototype.record = function (tag) {
  tag.setAttribute('type', this.constructor.name);
  tag.setAttribute('cx', this.cx);
  tag.setAttribute('cy', this.cy);
  tag.setAttribute('dirx', this.dirX);
  return tag;
}

Patrol.parseRecord = function (record) {
  let cx = Number.parseFloat(record.attributes.cx.nodeValue);
  let cy = Number.parseFloat(record.attributes.cy.nodeValue);
  let dirX = Number.parseInt(record.attributes.dirx.nodeValue);
  return { cx, cy, dirX };
}