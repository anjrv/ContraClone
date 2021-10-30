function Player(descr) {
  Character.call(this, descr);
  this.speed = 1;
  this.jumps = 0;
}

Player.prototype = Object.create(Character.prototype);

Player.prototype.KEY_LEFT = "A".charCodeAt(0);
Player.prototype.KEY_RIGHT = "D".charCodeAt(0);
Player.prototype.KEY_UP = "W".charCodeAt(0);
Player.prototype.KEY_DOWN = "S".charCodeAt(0);

Player.prototype.KEY_JUMP = " ".charCodeAt(0);

Player.prototype.update = function (du) {
  spatialManager.unregister(this);

  if (this._isDeadNow) return entityManager.KILL_ME_NOW;

  this.computeSubStep(du);

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
