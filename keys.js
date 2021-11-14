// =================
// KEYBOARD HANDLING
// =================

const KEY_LEFT = 'A'.charCodeAt(0);
const KEY_RIGHT = 'D'.charCodeAt(0);
const KEY_UP = 'W'.charCodeAt(0);
const KEY_DOWN = 'S'.charCodeAt(0);
const KEY_JUMP = ' '.charCodeAt(0);
const KEY_SHOOT = 'J'.charCodeAt(0);
const KEY_FLYUP = 'L'.charCodeAt(0);
const KEY_CROUCH = 16; // Shift

const keys = [];

function handleKeydown(evt) {
  keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
  keys[evt.keyCode] = false;
}

// Inspects, and then clears, a key's state
//
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
//
function eatKey(keyCode) {
  const isDown = keys[keyCode];
  keys[keyCode] = false;
  return isDown;
}

// A tiny little convenience function
function keyCode(keyChar) {
  return keyChar.charCodeAt(0);
}

window.addEventListener('keydown', handleKeydown);
window.addEventListener('keyup', handleKeyup);
