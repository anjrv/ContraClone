// Starting positions in the spritesheet
var p_ssbX = 0;
var p_ssbY = 0;

// Sprite size
var p_size = 46;

// Number of columns of spritesheet
var p_sn = 6;
// Number of rows of s

// How big the sprite should be scaled
var p_scale = 2;

var p_realSize = p_scale * p_size;

// Size of the spriteSheet
var p_ssHeight = 2240;

// Calculate where the sprite should appear
// NOTE! It was made unnecessary after worldmap update
var p_ground = p_ssHeight / 2;

var p_ground2 = 0;

function Player(descr) {
  Character.call(this, descr);
  this.speed = 1;
  this.jumps = 0;

  //Sprite stuff
  this.sprite = g_sprites.player;
  this.frame = 0;
  // this.ssbX = p_ssbX;
  // this.ssbY = p_ssbY;
  // this.spriteWidth = p_size;
  // this.spriteHeight = p_size;
  // this.spriteNumber = p_sn;
  // this.spriteScale = p_scale;
  // this.ssHeight = p_ssHeight;
  this.angle = 0;
  this.realSize = g_sprites.player.sWidth * this.scale;
  this.floor = p_ground2;

  // Collisions
  this.collider = new Collider({
    type: "Box",
    cx: 0,
    cy: 0,
    width: p_realSize * 0.4,
    height: p_realSize * 0.75,
    offsetY: p_realSize * 0.125,
  });

  // Direction 1 is right, -1 is left.
  this.dirX = 1;
  this.scale = p_scale;
  this.jumping = false;
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.KEY_LEFT = "A".charCodeAt(0);
Player.prototype.KEY_RIGHT = "D".charCodeAt(0);
Player.prototype.KEY_UP = "W".charCodeAt(0);
Player.prototype.KEY_DOWN = "S".charCodeAt(0);

Player.prototype.KEY_JUMP = " ".charCodeAt(0);
Player.prototype.KEY_SHOOT = "J".charCodeAt(0);
Player.prototype.KEY_CROUCH = 16;

// Variables that bullets can use.
var p_velX;
var p_velY;
Player.prototype.update = function (du) {
  spatialManager.unregister(this);

  if (this._isDeadNow) return entityManager.KILL_ME_NOW;

  this.computeSubStep(du);
  this.changeSprite(du);
  this.maybeShoot();
  p_velX = this.velX;
  p_velY = this.velY;
  spatialManager.register(this);
};

const NOMINAL_ACC = 0.3;
const NOMINAL_FRICTION = 0.2;
const MAX_JUMPS = 2;
const MAX_VEL = 10;
const MAX_TURNAROUND_FORCE = 10.0;

Player.prototype.computeSubStep = function (du) {
  let acceleration = 0;
  if (keys[this.KEY_LEFT]) {
    acceleration -=
      NOMINAL_ACC *
      util.lerp(
        1.0,
        MAX_TURNAROUND_FORCE,
        (this.velX + MAX_VEL) / (2 * MAX_VEL)
      );
  } else if (keys[this.KEY_RIGHT]) {
    acceleration +=
      NOMINAL_ACC *
      util.lerp(
        MAX_TURNAROUND_FORCE,
        1.0,
        (this.velX + MAX_VEL) / (2 * MAX_VEL)
      );
  } else if (this.onGround) {
    acceleration -= NOMINAL_FRICTION * this.velX;
  }

  
  let gravityAcc = this.computeGravity();

  if (!keys[this.KEY_JUMP] && this.jumping) {
    this.velY *= 0.5;
    this.jumping = false;
  }
  if (this.onGround) {
    this.jumps = 0;
  }
  if (keys[this.KEY_JUMP] && !this.jumping) {
    gravityAcc = -20.0;
    // this.jumps++;
    this.jumping = true;
  }

  this.applyAccel(acceleration, gravityAcc, du);

  return acceleration;
};

Player.prototype.maybeShoot = function () {
  if (keys[this.KEY_SHOOT]) {
    // Calculate the direction of the bullet.
    let vX = Math.sign(this.velX) * Math.cos(this.angle);
    let vY = -Math.sin(this.angle);
    let bulletAngle =
      Math.sign(this.velX) > 0 ? this.angle : -this.angle + Math.PI;
    entityManager.firePlayerBullet(
      this.rX + (vX * this.sprite.sWidth) / 2,
      this.rY + (vY * this.sprite.sHeight) / 2,
      vX * g_bulletSpeed,
      vY * g_bulletSpeed,
      -bulletAngle
    );
  }
};

// Maybe TODO later, make changeCounter adjusted to Speed
var p_changeCounter = 77;
var p_changeBase = p_changeCounter;

Player.prototype.changeSprite = function (du) {
  // A counter that changes the sprite when du * velocity reaches a certain number.
  p_changeCounter -= du * Math.abs(this.velX);
  if (p_changeCounter < 0) {
    this.frame += 1;
    p_changeCounter = p_changeBase;
  }

  this.angle = 0;

  if (Math.abs(this.velX) < 1) {
    this.sprite.animation = "IDLE";
  }

  if (keys[this.KEY_RIGHT] || keys[this.KEY_LEFT]) {
    this.sprite.animation = "RUN_FORWARD";
    if (keys[this.KEY_UP]) {
      this.angle = Math.PI / 4;
      this.sprite.animation += "_UP";
    }
    if (keys[this.KEY_DOWN]) {
      this.angle = -Math.PI / 4;
      this.sprite.animation += "_DOWN";
    }
    return;
  }

  if (keys[this.KEY_DOWN]) {
    this.angle = -Math.PI / 2;
    this.sprite.animation = "LOOK_DOWN";
    return;
  }

  if (keys[this.KEY_UP]) {
    this.angle = Math.PI / 2;
    this.sprite.animation = "LOOK_UP";
    return;
  }

  if (keys[this.KEY_CROUCH]) {
    this.sprite.animation = "CROUCH";
    return;
  }

 
};

Player.prototype.render = function (ctx) {
  this.sprite.scale = this.scale;
  this.rX = g_canvas.width / 4 + worldMap.diffX;
  this.rY = g_canvas.height / 2 + worldMap.diffY;
  this.collider.cx = this.rX;
  this.collider.cy = this.rY;
  this.sprite.updateFrame(this.frame || 0);
  this.sprite.drawCentredAt(ctx,this.rX , this.rY, 0, this.velX < 0)
}

Player.prototype.record = function (tag) {
  tag.setAttribute("type", this.constructor.name);
  tag.setAttribute("posx", this.cx);
  tag.setAttribute("posy", this.cy);
  tag.setAttribute("velx", this.velX);
  tag.setAttribute("vely", this.velY);
  tag.setAttribute("jumps", this.jumps);
  tag.setAttribute("dirx", this.dirX);
  return tag;
};

Player.parseRecord = function (record) {
  let cx = Number.parseFloat(record.attributes.posx.nodeValue);
  let cy = Number.parseFloat(record.attributes.posy.nodeValue);
  let velX = Number.parseFloat(record.attributes.velx.nodeValue);
  let velY = Number.parseFloat(record.attributes.vely.nodeValue);
  let jumps = Number.parseInt(record.attributes.jumps.nodeValue);
  let dirX = Number.parseInt(record.attributes.dirx.nodeValue);

  return { cx, cy, velX, velY, jumps, dirX };
};
