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

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation, entity) {
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
        let beginX = entity.ssbX;
        let beginY = entity.ssbY;
        let dir = entity.direction;
        ctx.scale(dir,this.scale)
        let scale = entity.spriteScale;
        let posX = (dir === -1) ? width * dir * scale : 0;
        ctx.drawImage(this.image,beginX,beginY,width,height,
                        posX,entity.floor-height,width*scale,height*scale);
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

