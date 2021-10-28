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
  this.posX += 0.1
}

// TODO
// make it not hacky as fuch
Background.prototype.render = function (ctx) {
  let origScale = this.layer1.scale;
  this.layer1.scale = ctx.canvas.width /( 2 * this.layer1.width );
  //this.layer1.scale = ctx.canvas.height / this.layer1.height;
  this.layer1.drawCentredAt(ctx, this.layer1.scale*this.layer1.width/2, ctx.canvas.height/2);
  this.layer1.drawCentredAt(ctx, this.layer1.scale*this.layer1.width*1.5, ctx.canvas.height/2);
  this.layer1.scale = origScale;

  origScale = this.layer2.scale;
  this.layer2.scale = ctx.canvas.width /( 2 * this.layer2.width );

  this.layer2.drawCentredAt(ctx, this.posX + this.layer2.scale*this.layer2.width/2, ctx.canvas.height/2);
  this.layer2.drawCentredAt(ctx, this.posX + this.layer2.scale*this.layer2.width*1.5, ctx.canvas.height/2);

  this.layer2.scale = origScale;
} 