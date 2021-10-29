// Debugger class that can provide dt values to the _update_clocks routine in main
// and simultanuously set all the pressed down keys to true


// Constructor
function Debugger() {
  this.frame_count = 0;
  this.keys = [];
  this.xml = `
  <recording>
    <timestep>
      <dt>16</dt>
      <key>D</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>D</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>D</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>D</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key> </key>
    </timestep>
    <timestep>
      <dt>16</dt>
    </timestep>
    <timestep>
      <dt>16</dt>
    </timestep>
    <timestep>
      <dt>16</dt>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
    <timestep>
      <dt>16</dt>
      <key>A</key>
    </timestep>
  </recording>`
  let parser = new DOMParser();
  let xml_object = parser.parseFromString(this.xml, 'text/xml');
  this.timestamps = xml_object.getElementsByTagName('timestep');
  console.log(this.timestamps);
}

// Request that the debugger moves to the next frame
// Has to be seperate because the update is sometimes paused but the clocks are still 
// update-ing
Debugger.prototype.nextFrame = function () {
  this.frame_count++;
}

// Returns the dt value for the next frame and updates the global keys array so that
// the correct keys are in the pressed down state. 
Debugger.prototype.getNextFrameDelta_ms = function() {
  // We are manipulating the keys arrays and have to clean up after ourselves
  this.cleanupKeys();

  // When the recording is over we turn off the recording and reset the framecount to 0
  if (this.frame_count >= this.timestamps.length) {
    this.frame_count = 0;
    g_play_recording = false;
    return NOMINAL_UPDATE_INTERVAL;
  }

  let dt = this.timestamps[this.frame_count]
    .getElementsByTagName('dt')[0]
    .innerHTML;
  
  let keys_this_frame = this.timestamps[this.frame_count]
    .getElementsByTagName('key');

  for (let i = 0; i < keys_this_frame.length; i++) {
    let key = keys_this_frame[i].innerHTML;
    keys[keyCode(key)] = true;
    this.keys.push(key);
  }

  return Number.parseFloat(dt);
}

// Sets all the keys we have explicitly set to true back to false 
// Prevents contamination of input between frames
Debugger.prototype.cleanupKeys = function () {
  for (let i = this.keys.length - 1; i >= 0; i--) {
    keys[keyCode(this.keys[i])] = false;
    this.keys.splice(i, 1);
  }
}

const DEBUGGER = new Debugger();