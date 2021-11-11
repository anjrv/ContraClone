// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

'use strict';

const util = {
  // RANGES
  // ======

  clampRange: function (value, lowBound, highBound) {
    if (value < lowBound) {
      value = lowBound;
    } else if (value > highBound) {
      value = highBound;
    }
    return value;
  },

  wrapRange: function (value, lowBound, highBound) {
    while (value < lowBound) {
      value += highBound - lowBound;
    }
    while (value > highBound) {
      value -= highBound - lowBound;
    }
    return value;
  },

  isBetween: function (value, lowBound, highBound) {
    if (value < lowBound) {
      return false;
    }
    if (value > highBound) {
      return false;
    }
    return true;
  },

  // RANDOMNESS
  // ==========

  randRange: function (min, max) {
    return min + Math.random() * (max - min);
  },

  // MISC
  // ====

  square: function (x) {
    return x * x;
  },

  // DISTANCES
  // =========

  distSq: function (x1, y1, x2, y2) {
    return this.square(x2 - x1) + this.square(y2 - y1);
  },

  wrappedDistSq: function (x1, y1, x2, y2, xWrap, yWrap) {
    let dx = Math.abs(x2 - x1),
      dy = Math.abs(y2 - y1);
    if (dx > xWrap / 2) {
      dx = xWrap - dx;
    }
    if (dy > yWrap / 2) {
      dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
  },

  // CANVAS OPS
  // ==========

  // clearCanvas: function (ctx) {
  //   const prevfillStyle = ctx.fillStyle;
  //   ctx.fillStyle = 'black';
  //   ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   ctx.fillStyle = prevfillStyle;
  // },

  clearCanvas: function (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },

  strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  },

  fillCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  },

  fillBox: function (ctx, x, y, w, h, style) {
    const oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
  },

  fillBoxCentered: function (ctx, x, y, w, h, style) {
    const oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
    ctx.fillStyle = oldStyle;
  },

  strokeBoxCentered: function (ctx, x, y, w, h, style) {
    const oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = style;
    ctx.strokeRect(x - w / 2, y - h / 2, w, h);
    ctx.strokeStyle = oldStyle;
  },

  lerp: function (start, end, amt) {
    return start + (end - start) * amt;
  },

  angle: function (cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;

    return Math.atan2(dy, dx);
  },

  parseNum: function (value) {
    try {
      return parseInt(value, 10);
    } catch (err) {
      // Nevermind
    }

    return -1;
  },
};
