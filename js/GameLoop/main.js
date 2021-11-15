// ========
// MAINLOOP
// ========
/*

The mainloop is one big object with a fairly small public interface
(e.g. init, iter, gameOver), and a bunch of private internal helper methods.

*/

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

const main = {
  // "Frame Time" is a (potentially high-precision) frame-clock for animations
  _frameTime_ms: null,
  _frameTimeDelta_ms: null,
  _aspectRatio: 16 / 9,
};

// Perform one iteration of the mainloop
main.iter = function (frameTime) {
  // Use the given frameTime to update all of our game-clocks
  this._updateClocks(frameTime);
  if (this._frameTimeDelta_ms !== 0) {
    // Perform the iteration core to do all the "real" work
    this._iterCore(this._frameTimeDelta_ms);
  
    // Diagnostics, such as showing current timer values etc.
    this._debugRender(g_ctx);
  }
  
  // Request the next iteration if needed
  if (!this._isGameOver) this._requestNextIteration();
};

main._updateClocks = function (frameTime) {
  // First-time initialisation
  if (this._frameTime_ms === null) this._frameTime_ms = frameTime;

  // If we are playing a recording we set our time explicitly by the recording values
  if (g_play_recording) {
    this._frameTimeDelta_ms = RECORDINGPLAYER.getNextFrameDelta_ms();
    this._frameTime_ms += this._frameTimeDelta_ms;
    return;
  }

  // Track frameTime and its delta
  this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
  this._frameTime_ms = frameTime;
};

main._iterCore = function (dt) {
  gatherInputs();
  update(dt);
  render(g_ctx);
};

main.should_save_timeframe = false;

main.saveTimeframe = function () {
  let timeframe = document.createElement('timeframe');
  let dt = document.createElement('dt');
  dt.innerHTML = this._frameTimeDelta_ms;
  timeframe.appendChild(dt);
  for (var ID in keys) {
    if (!keys[ID] || ID == '8'.charCodeAt(0)) continue;
    let key = document.createElement('key');
    key.innerHTML = ID;
    timeframe.appendChild(key);
  }

  this.recording.appendChild(timeframe);
};

main.createRecord = function () {
  let recording = document.implementation.createDocument(null, 'recording');
  this.recording = recording.getElementsByTagName('recording')[0];

  // let worldmap = document.createElement('worldmap');
  // worldMap.recordCameraInfo(worldmap);
  // this.recording.appendChild(worldmap);

  let entities = document.createElement('entities');
  entityManager.recordEntities(entities);
  this.recording.appendChild(entities);
};

main.storeRecord = function () {
  localStorage.setItem(
    'recording',
    new XMLSerializer().serializeToString(this.recording),
  );
};

main._isGameOver = false;

main.gameOver = function () {
  this._isGameOver = true;
  console.info('gameOver: quitting...');
};

main.restartGame = function () {
  this._isGameOver = false;
};

// Simple voluntary quit mechanism
//
function requestedQuit() {
  return keys[KEY_QUIT];
}

// Annoying shim for Firefox and Safari
window.requestAnimationFrame =
  window.requestAnimationFrame || // Chrome
  window.mozRequestAnimationFrame || // Firefox
  window.webkitRequestAnimationFrame; // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
  main.iter(frameTime);
}

main._requestNextIteration = function () {
  window.requestAnimationFrame(mainIterFrame);
};

// Mainloop-level debug-rendering

main._doTimerShow = false;

main._debugRender = function (ctx) {
  if (eatKey(TOGGLE_TIMER_SHOW)) this._doTimerShow = !this._doTimerShow;

  if (!this._doTimerShow) return;

  let y = 600;
  ctx.textAlign = 'left';
  ctx.fillText('FT ' + this._frameTime_ms, 200, y + 10);
  ctx.fillText('FD ' + this._frameTimeDelta_ms, 200, y + 50);
  ctx.fillText('UU ' + g_prevUpdateDu, 200, y + 100);
  ctx.fillText('FrameSync ON', 200, y + 150);
};

main.init = function () {
  window.focus(true);

  g_ctx.fillStyle = 'white';

  this._requestNextIteration();
};
