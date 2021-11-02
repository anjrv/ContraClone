// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */


// Construct a "sprite" from the given `image`,
//
function Sprite(image) {
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.scale = 1;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, 
                  x, y);
};

Sprite.prototype.sx = 0;
Sprite.prototype.sy = 0;

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation, entity, yDir) {
    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    if (entity) {
        let width = entity.spriteWidth;
        let height = entity.spriteHeight;
        let scale = entity.spriteScale;
        let realWidth = width * scale;
        let realHeight = height * scale;
        let beginX = entity.ssbX;
        let beginY = entity.ssbY;
        let dirX = entity.dirX;
        let dirY = (yDir) ? -yDir : this.scale;
        ctx.scale(dirX,dirY)
        let posX = (dirX === -1) ? (realWidth * dirX)+(realWidth)/2 : (-realWidth*dirX)+(realWidth)/2;
        let posY = entity.floor-(realHeight)+(realHeight/2);
        ctx.drawImage(this.image,beginX,beginY,width,height,
                        posX,posY,realWidth,realHeight);
    } else {
        ctx.drawImage(this.image, -w/2, -h/2);
    }
    ctx.restore();
};  

/*Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation, entity) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation,entity);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation,entity);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation,entity);
};*/

/*Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation, entity) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation, entity);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation, entity);
    this.drawCentredAt(ctx, cx, cy + sh, rotation, entity);
};*/

Sprite.prototype.drawWrappedHorizontalCentredAt = function (
  ctx,
  cx,
  cy,
  rotation,
) {
  // Get "screen height"
  const sw = g_canvas.width;

  // Draw primary instance
  this.drawCentredAt(ctx, cx, cy, rotation);

  // Top and Bottom wraps
  this.drawCentredAt(ctx, cx-sw, cy, rotation);
  this.drawCentredAt(ctx, cx-sw, cy, rotation);
};
