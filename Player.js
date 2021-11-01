// Starting positions in the spritesheet
var p_ssbX = 0;
var p_ssbY = 0;

// Sprite size
var p_size = 46;

// Number of sprites in row of spritesheet
var p_sn = 6;

// How big the sprite should be scaled
var p_scale = 2;

var p_realSize = p_scale * p_size;

// Size of the spriteSheet
var p_ssHeight = 2240;

// Calculate where the sprite should appear
// NOTE! It was made unnecessary after worldmap update
var p_ground = (p_ssHeight/2);

var p_ground2 = 0;

function Player(descr) {
  this.speed = 1;
  this.jumps = 0;

  //Sprite stuff
  this.sprite = g_sprites.player;
  this.ssbX = p_ssbX;
  this.ssbY = p_ssbY;
  this.spriteWidth = p_size;
  this.spriteHeight = p_size;
  this.spriteNumber = p_sn;
  this.spritePosition = 0;
  this.spriteScale = p_scale;
  this.ssHeight = p_ssHeight;
  this.floor = p_ground2;
  this.realSize = p_realSize;

  // Collisions
  this.collider = new Collider({
    type: 'Box',
    cx: 0,
    cy: 0,
    width: p_realSize * 0.4,
    height: p_realSize * 0.75,
    offsetY: p_realSize * 0.125,
  })

  // Direction 1 is right, -1 is left.
  this.dirX = 1;
  Character.call(this, descr);
}

Player.prototype = Object.create(Character.prototype);

Player.prototype.KEY_LEFT  = "A".charCodeAt(0);
Player.prototype.KEY_RIGHT = "D".charCodeAt(0);
Player.prototype.KEY_UP    = "W".charCodeAt(0);
Player.prototype.KEY_DOWN  = "S".charCodeAt(0);

Player.prototype.KEY_JUMP  = " ".charCodeAt(0);
Player.prototype.KEY_SHOOT = "J".charCodeAt(0);

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
  if (this.onGround) {
    this.jumps = 0;
  }
  if (eatKey(this.KEY_JUMP) && this.jumps < MAX_JUMPS) {
    gravityAcc = -20.0;
    this.jumps++;
  }

  this.applyAccel(acceleration, gravityAcc, du, true);

  this.cx = g_ctx.canvas.width/2;
  this.cy = g_ctx.canvas.height/2;

  return acceleration;
};

Player.prototype.maybeShoot = function () {
  if (keys[this.KEY_SHOOT]) {
    let vX = (this.shootV) ? 0 : this.dirX * g_bulletSpeed;
    let vY;
    switch (this.dirY) {
      case 0:
        vY = -1;
        break;
      case 0.25:
        vY = -1;
        break;
      case 0.5:
        vY = 0;
        break;
      case 0.75:
        vY = 1;
        break;
      case 1:
        vY = 1;
        break;
    }
    vY *= g_bulletSpeed;
    console.log(vY);
    let dX = (this.shootV) ? this.cx : this.cx + (this.realSize/2 * this.dirX);
    let dY = (this.shootV) ? this.cy + (this.realSize/2 * this.dirY) : this.cy + this.dirY;
    if (this.shootDU)       { dY -= this.realSize/2; }
    else if (this.shootDD)  { dY += this.realSize/2; }
    else if (this.shootV && vY === -1 * g_bulletSpeed) {dY = this.cy - (this.realSize/2); }
    entityManager.firePlayerBullet(dX,dY,vX,vY,this.dirX,this.dirY, vY/g_bulletSpeed, this.shootV, this.shootH, this.shootDU, this.shootDD);
  }
}

// Maybe TODO later, make changeCounter adjusted to Speed
var p_changeCounter = 77;
var p_changeBase = p_changeCounter;

// Row number in spritesheet
var p_UR = 6;
var p_U = 12;
var p_DR = 43;
var p_D = 36;

Player.prototype.changeSprite = function(du) {
  // A counter that changes the sprite when du * velocity reaches a certain number.
  p_changeCounter -= du*Math.abs(this.velX);
  if (p_changeCounter < 0) {
    this.spritePosition += 1;
    p_changeCounter = p_changeBase;
  }

  // Change the direction of player to mirror sprite
  this.dirX = (this.velX < 0) ? -1 : 1;

  // In the character sprite there is a crouch sprite which we skip
  if (this.spritePosition === 1) this.spritePosition += 1;

  // Reset when reached end of spritesheet row
  if (this.spritePosition === this.spriteNumber) this.spritePosition = 0;

  // Change to standing sprite when player stops
  if (Math.abs(this.velX) < 1) this.spritePosition = 0;

  // Make ready for the draw method
  this.ssbX = this.spriteWidth * this.spritePosition;

  // Extra complicated for player sprite, different sprites when aiming.
  if ((keys[this.KEY_RIGHT] || keys[this.KEY_LEFT]) && keys[this.KEY_UP]) { 
    this.shootV = false;
    this.shootH = false;
    this.shootDU = true;
    this.shootDD = false;
    this.dirY = 0.25
    this.ssbY = this.spriteHeight * p_UR; 
  } 
  else if ((keys[this.KEY_RIGHT] || keys[this.KEY_LEFT]) && keys[this.KEY_DOWN]) {
    this.shootH = false;
    this.shootV = false;
    this.shootDU = false;
    this.shootDD = true;
    this.dirY = 0.75;
    this.ssbY = this.spriteHeight * p_DR;
  }
  else if (keys[this.KEY_DOWN]) {
    this.shootV = true;
    this.shootH = false;
    this.shootDU = false;
    this.shootDD = false;
    this.dirY = 1;
    this.ssbY = this.spriteHeight * p_D;
  }
  else if (keys[this.KEY_UP]) {
    this.shootV = true;
    this.shootH = false;
    this.shootDU = false;
    this.shootDD = false;
    this.dirY = 0;
    this.ssbY = this.spriteHeight * p_U;
  }
  else { 
    this.shootV = false;
    this.shootH = true;
    this.shootDU = false;
    this.shootDD = false;
    this.dirY = 0.5;
    this.ssbY = 0 
  }
}
