// ============
// SPRITE STUFF
// ============

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

// Construct a "sprite" from the given `image`,
//
function Sprite(image, cols = 1, rows = 1, sWidth = 0, sHeight = 0) {
  this.image = image;
  this.width = image.width;
  this.height = image.height;
  this.cols = cols;
  this.rows = rows;
  this.sWidth = sWidth || image.width;
  this.sHeight = sHeight || image.height;
  this.animations = {
    NONE: Array(cols * rows)
      .fill()
      .map((x, i) => i),
  };
  this.animation = 'NONE';
}

// Sprite.prototype.sx = 0;
// Sprite.prototype.sy = 0;
Sprite.prototype.frame = 0;
Sprite.prototype.scale = 1;

Sprite.prototype.updateFrame = function (frame_num) {
  const anim_frame = frame_num % this.animations[this.animation].length;
  this.frame = this.animations[this.animation][anim_frame];
};

Sprite.prototype.drawAt = function (ctx, x, y) {
  ctx.drawImage(this.image, x, y);
};

Sprite.prototype.drawCentredAt = function (
  ctx,
  cx,
  cy,
  rotation = 0,
  mirror = false,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  const mirrorMult = mirror ? -1 : 1;
  ctx.scale(this.scale * mirrorMult, this.scale);

  // drawImage expects "top-left" coords, so we offset our destination
  // coords accordingly, to draw our sprite centred at the origin

  ctx.drawImage(
    this.image,
    this.sWidth * (this.frame % this.cols),
    this.sHeight * Math.floor(this.frame / this.cols),
    this.sWidth,
    this.sHeight,
    -this.sWidth / 2,
    -this.sHeight / 2,
    this.sWidth,
    this.sHeight,
  );
  ctx.restore();
};

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
  // Get "screen width"
  var sw = g_canvas.width;

  // Draw primary instance
  this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);

  // Left and Right wraps
  this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
  this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (
  ctx,
  cx,
  cy,
  rotation,
) {
  // Get "screen height"
  var sh = g_canvas.height;

  // Draw primary instance
  this.drawCentredAt2(ctx, cx, cy, rotation);

  // Top and Bottom wraps
  this.drawCentredAt2(ctx, cx, cy - sh, rotation);
  this.drawCentredAt2(ctx, cx, cy + sh, rotation);
};

Sprite.prototype.drawCentredAt2 = function (ctx, cx, cy, rotation) {
  // This is how to implement default parameters...
  if (rotation === undefined) rotation = 0;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.translate(-cx, -cy);
  ctx.drawImage(
    this.image,
    cx - this.width / 2,
    cy - this.height / 2,
    this.width,
    this.height,
  );
  ctx.restore();
};
