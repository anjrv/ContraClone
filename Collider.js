'use strict';

function Collider(descr) {
  for (const property in descr) {
    this[property] = descr[property];
  }
}

Collider.prototype.offsetX = 0;
Collider.prototype.offsetY = 0;

Collider.prototype.collide = function (other) {
  if (this.type === 'Circle') {
    if (other.type === 'Circle') {
      return this.collideCircleCircle(other);
    }
    if (other.type === 'Box') {
      return this.collideCircleBox(other);
    }
  }
  if (this.type === 'Box') {
    if (other.type === 'Circle') {
      return this.collideCircleBox.call(other, this);
    }
    if (other.type === 'Box') {
      return this.collideBoxBox(other);
    }
  }
};

Collider.prototype.collideCircleCircle = function (other) {
  const dx = this.cx + this.offsetX - (other.cx + other.offsetX);
  const dy = this.cy + this.offsetY - (other.cy + other.offsetY);
  const dist_sq = dx * dx + dy * dy;
  return dist_sq < (this.radius + other.radius) ** 2;
};

Collider.prototype.collideCircleBox = function (other) {
  const dx = Math.abs(this.cx + this.offsetX - (other.cx + other.offsetX));
  const dy = Math.abs(this.cy + this.offsetY - (other.cy + other.offsetY));

  if (dx > other.width / 2 + this.radius) return false;
  if (dy > other.height / 2 + this.radius) return false;

  if (dx <= other.width / 2) return true;
  if (dy <= other.height / 2) return true;

  const cornerDist = (dx - other.width / 2) ** 2 + (dy - other.height / 2) ** 2;
  return cornerDist <= this.radius ** 2;
};

Collider.prototype.collideBoxBox = function (other) {
  const dx = Math.abs(this.cx + this.offsetX - (other.cx + other.offsetX));
  const dy = Math.abs(this.cy + this.offsetY - (other.cy + other.offsetY));

  if (dx > this.width / 2 + other.width / 2) return false;
  if (dy > this.height / 2 + other.height / 2) return false;

  return true;
};

Collider.prototype.render = function (ctx) {
  const prevStyle = ctx.strokeStyle;
  ctx.strokeStyle = 'red';
  if (this.type === 'Circle') {
    ctx.beginPath();
    ctx.arc(
      this.cx + this.offsetX,
      this.cy + this.offsetY,
      this.radius,
      0,
      2 * Math.PI,
    );
    ctx.stroke();
  }
  if (this.type === 'Box') {
    ctx.beginPath();
    ctx.rect(
      this.cx + this.offsetX - this.width / 2,
      this.cy + this.offsetY - this.height / 2,
      this.width,
      this.height,
    );
    ctx.stroke();
  }
  ctx.strokeStyle = prevStyle;
};

// // Tests to check if colliders are working
// const test_colliders = [
//     new Collider({
//         type: "Circle",
//         cx: 100,
//         cy: 100,
//         radius: 25
//     }),
//     new Collider({
//         type: "Box",
//         cx: 100,
//         cy: 100,
//         width: 50,
//         height: 50
//     }),
//     new Collider({
//         type: "Circle",
//         cx: 200,
//         cy: 200,
//         radius: 25
//     }),
//     new Collider({
//         type: "Box",
//         cx: 149,
//         cy: 100,
//         width: 50,
//         height: 50
//     }),
//     new Collider({
//         type: "Circle",
//         cx: 139,
//         cy: 139,
//         radius: 25
//     }),
// ]
// console.assert(test_colliders[0].collide(test_colliders[1]), "Collision is not working")
// console.assert(!test_colliders[0].collide(test_colliders[2]), "Collision is not working")
// console.assert(test_colliders[0].collide(test_colliders[3]), "Collision is not working")
// console.assert(test_colliders[1].collide(test_colliders[3]), "Collision is not working")
// console.assert(!test_colliders[0].collide(test_colliders[4]), "Collision is not working")
// console.assert(test_colliders[1].collide(test_colliders[4]), "Collision is not working")
