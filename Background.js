/* 
  Background "entity"
  To do the parralax layered movement the background has to know from what 
  position we are rendering from
*/ 
function Background(descr) {
  this.posX = 0;
  this.layer1 = this.layer1 ||  g_sprites.background_layer1;
  console.log(this.layer1)
  this.layer2 = this.layer2 || g_sprites.background_layer2;
  this.layer3 = this.layer3 || g_sprites.background_layer3;
}

Background.prototype.scroll = function (dx) {
  this.posX += dx;
}

Background.prototype.update = function (du) {
  // maybe we want something here
  //this.posX -= 1;
  //this.posX %= 10000; // TODO this causes jerk sometimes
}

Background.prototype.tileFillScreen = function(ctx, tile, dx = 0) {
  let originalScale = tile.scale;
  // scale so the tile fills out the height
  tile.scale = ctx.canvas.height / tile.height;

  let scaledWidth = tile.width * tile.scale;
  let widthsToFill = Math.ceil(ctx.canvas.width / scaledWidth)+1;

  dx %= scaledWidth;

  for (let i = -1; i < widthsToFill; i++) {
    let displaceX = (i + 0.5) * scaledWidth + dx;
    
    tile.drawCentredAt(ctx, displaceX, ctx.canvas.height/2);

  }


  tile.scale = originalScale;
}

// TODO
// make it not hacky as fuch
Background.prototype.render = function (ctx) {
  this.tileFillScreen(ctx, this.layer1);
  this.layer3.drawCentredAt(ctx, (0.1*this.posX)+ (ctx.canvas.width/2), ctx.canvas.height/2);
  this.tileFillScreen(ctx, this.layer2, this.posX);
  // this.layer3.drawCentredAt(ctx, ctx.canvas.width/2, ctx.canvas.height/2)

  // origScale = this.layer2.scale;
  // this.layer2.scale = ctx.canvas.width /( 2 * this.layer2.width );

  // this.layer2.drawCentredAt(ctx, this.posX + this.layer2.scale*this.layer2.width/2, ctx.canvas.height/2);
  // this.layer2.drawCentredAt(ctx, this.posX + this.layer2.scale*this.layer2.width*1.5, ctx.canvas.height/2);

  // this.layer2.scale = origScale;

} 