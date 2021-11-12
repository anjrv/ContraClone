// =================
// KEYBOARD HANDLING
// =================

const keys = [];

function handleKeydown(evt) {
  keys[evt.keyCode] = true;
  if (g_intro) {
    g_intro = false;
    m_startGame.play();
    m_Intro.stop();
    setTimeout(function () {startGame();}, 1200);
  }
}

function startGame() {
  entityManager.setStuff();
  entityManager.init();
  worldMap.init(currentLevel);
  main.restartGame();
  main.init(); 
  g_playing = true;
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
