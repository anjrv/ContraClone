//  RecordingPlayer class that can provide dt values to the _update_clocks routine in main
// and simultanuously set all the pressed down keys to true

// Constructor
function RecordingPlayer() {
  this.frame_count = 0;
  this.keys = [];
  let parser = new DOMParser();
  let xml_object = parser.parseFromString(recording, 'text/xml');
  this.timestamps = xml_object.getElementsByTagName('timeframe');
  this.entities = xml_object.getElementsByTagName('entities')[0];
  //this.worldMap = xml_object.getElementsByTagName('worldmap')[0];
}

// Request that the player moves to the next frame
// Has to be seperate because the update is sometimes paused but the clocks are still 
// update-ing
RecordingPlayer.prototype.nextFrame = function () {
  this.frame_count++;
}

// Returns the dt value for the current frame
RecordingPlayer.prototype.getNextFrameDelta_ms = function() {
  if (this.frame_count === 0) {
    spatialManager.wipeCollisionObjects();
    entityManager.restoreEntities(this.entities);
    //worldMap.init(level1); // this will be a problem with the enemy spawning
  }
  // When the recording is over we turn off the recording and reset the framecount to 0
  if (this.frame_count >= this.timestamps.length) {
    this.cleanupKeys();
    this.frame_count = 0;
    g_play_recording = false;
    return NOMINAL_UPDATE_INTERVAL;
  }

  let dt = this.timestamps[this.frame_count]
    .getElementsByTagName('dt')[0]
    .innerHTML;
  dt = dt.replace(/\u200B/g, '');
  return Number.parseFloat(dt);
}

// Updates the global keys array so that the correct keys are in the pressed down state 
// for the current frame
RecordingPlayer.prototype.setKeys = function () {
  // We are manipulating the keys arrays and have to clean up after ourselves
  this.cleanupKeys();

  let keys_this_frame = this.timestamps[this.frame_count]
    .getElementsByTagName('key');

  for (let i = 0; i < keys_this_frame.length; i++) {
    let key = keys_this_frame[i].innerHTML;
    key = key.replace(/\u200B/g, '');
    let keyCode = Number.parseInt(key);
    keys[keyCode] = true;
    this.keys.push(keyCode);
  }
}

// Sets all the keys we have explicitly set to true back to false 
// Prevents contamination of input between frames
RecordingPlayer.prototype.cleanupKeys = function () {
  for (let i = this.keys.length - 1; i >= 0; i--) {
    keys[this.keys[i]] = false;
    this.keys.splice(i, 1);
  }
}

const RECORDINGPLAYER = new RecordingPlayer();