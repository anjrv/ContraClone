// =================
// KEYBOARD HANDLING
// =================

const keys = [];

function handleKeydown(evt) {
  keys[evt.keyCode] = true;
  console.log("Key pressed :D")
  console.log(g_intro)
  if (g_intro) {
    g_intro = false;
    //m_startGame.play();
    m_Intro.stop();
    setTimeout(function () {startGame();}, 1500);
  }
}

function startGame() {
  entityManager.init();
  worldMap.init(level1);
  main.init(); 
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
