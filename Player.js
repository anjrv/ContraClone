function Player(descr) {
    Character.call(this, descr);
    this.speed = 1;
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.KEY_LEFT = 'A'.charCodeAt(0);
Player.prototype.KEY_RIGHT = 'D'.charCodeAt(0);
Player.prototype.KEY_UP = 'W'.charCodeAt(0);
Player.prototype.KEY_DOWN = 'S'.charCodeAt(0);

Player.prototype.KEY_JUMP = ' '.charCodeAt(0);

Player.prototype.update = function (du) {
    spatialManager.unregister(this);

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.computeSubStep(du);

    spatialManager.register(this);
}

const NOMINAL_ACC = 0.2;
const NOMINAL_FRICTION = 0.1;

Player.prototype.computeSubStep = function (du) {

    let acceleration = 0;

    if (keys[this.KEY_LEFT]) {
        acceleration -= NOMINAL_ACC;
    }
    if (keys[this.KEY_RIGHT]) {
        acceleration += NOMINAL_ACC;
    }
    acceleration -= acceleration == 0 ? NOMINAL_FRICTION * this.velX : 0;

    let gravityAcc = this.computeGravity();
    if (eatKey(this.KEY_JUMP) && this.onGround) {
        console.log("jump");
        gravityAcc = -20.0;
    }

    this.applyAccel(acceleration, gravityAcc, du);

    return acceleration;
}