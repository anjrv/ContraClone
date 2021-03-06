// GENERIC UPDATE LOGIC

// Dt means "delta time" and is in units of the timer-system (i.e. milliseconds)
//
var g_prevUpdateDt = null;

// Du means "delta u", where u represents time in multiples of our nominal interval
//
var g_prevUpdateDu = null;

// Track odds and evens for diagnostic / illustrative purposes
//
var g_isUpdateOdd = false;

function update(dt) {
  // Get out if skipping (e.g. due to pause-mode)
  //
  if (shouldSkipUpdate()) return;
  // we have to record the frame before we start eating keys
  if (g_record) main.saveTimeframe();

  // Remember this for later
  //
  var original_dt = dt;

  // Warn about very large dt values -- they may lead to error
  //
  if (dt > 200) {
    console.warn('Big dt =', dt, ': CLAMPING TO NOMINAL');
    dt = NOMINAL_UPDATE_INTERVAL;
  }

  // If using variable time, divide the actual delta by the "nominal" rate,
  // giving us a conveniently scaled "du" to work with.
  //
  var du = dt / NOMINAL_UPDATE_INTERVAL;

  // g_play_recording is set in processDiagnostics that happens in updateSimulation
  // so we cant update our frame counter on the same frame that g_play_recording is set
  if (g_play_recording) RECORDINGPLAYER.nextFrame();
  updateSimulation(du);

  g_prevUpdateDt = original_dt;
  g_prevUpdateDu = du;

  g_isUpdateOdd = !g_isUpdateOdd;
}

var g_isUpdatePaused = false;

function shouldSkipUpdate() {
  if (eatKey(KEY_PAUSE)) {
    g_isUpdatePaused = !g_isUpdatePaused;
  }
  return g_isUpdatePaused && !eatKey(KEY_STEP);
}
