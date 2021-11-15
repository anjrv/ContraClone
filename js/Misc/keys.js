// =================
// KEYBOARD HANDLING
// =================

//const KEY_GRAVITY = keyCode('G');
//const KEY_AVE_VEL = keyCode('V');
const KEY_SPATIAL = keyCode('X');
const KEY_HALT = keyCode('H');
const KEY_RESET = keyCode('R');
const KEY_DEVTOOLS = keyCode('0');
const KEY_1 = keyCode('1');
const KEY_2 = keyCode('2');
const KEY_K = keyCode('K');
const KEY_RECORD = keyCode('8');
const KEY_PLAY_RECORDING = keyCode('9');

const TOGGLE_CLEAR = 'C'.charCodeAt(0);
const TOGGLE_BOX = 'B'.charCodeAt(0);
const TOGGLE_UNDO_BOX = 'U'.charCodeAt(0);
const TOGGLE_FLIPFLOP = 'F'.charCodeAt(0);
const TOGGLE_RENDER = 'R'.charCodeAt(0);

const KEY_QUIT = 'Q'.charCodeAt(0);
const TOGGLE_TIMER_SHOW = 'T'.charCodeAt(0);

// Togglable Pause Mode
//
var KEY_PAUSE = 'P'.charCodeAt(0);
var KEY_STEP = 'O'.charCodeAt(0);

const ZOOM_IN = 'J'.charCodeAt(0);
const ZOOM_OUT = 'I'.charCodeAt(0);

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
