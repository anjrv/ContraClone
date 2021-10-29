//  RecordingPlayer class that can provide dt values to the _update_clocks routine in main
// and simultanuously set all the pressed down keys to true

// Constructor
function RecordingPlayer() {
  this.frame_count = 0;
  this.keys = [];
  this.xml = `<recording>​<timeframe>​<dt>17.28</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.75999999999999​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​15.919000000000096​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.894000000000005​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​17.023999999999887​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.25999999999999​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​17.145999999999958​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.624000000000024​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.37700000000018​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.700999999999794​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.91500000000019​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.69900000000007​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.630999999999858​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.644999999999982​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.434999999999945​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.967999999999847​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.620000000000346​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.083000000000084​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​17.200999999999567​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.676000000000386​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.51299999999992​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.498000000000047​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.884000000000015​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.774999999999636​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.64700000000039​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.432999999999993​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.454999999999927​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​17.072000000000116​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.695999999999913​</dt>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.717999999999847​</dt>​<key>​A​</key>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.59400000000005​</dt>​<key>​A​</key>​<key>​D​</key>​</timeframe>​<timeframe>​<dt>​16.51299999999992​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.62400000000025​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.802999999999884​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.744000000000142​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.6279999999997​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.71900000000005​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.585000000000036​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.365999999999985​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.327999999999975​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​17.13799999999992​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.347000000000207​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.692999999999756​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.954999999999927​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.821000000000367​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.545000000000073​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.355999999999767​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​17.128999999999905​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.56600000000026​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.092999999999847​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​17.269999999999982​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.67099999999982​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.047000000000025​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​17.274000000000342​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.661999999999807​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.7170000000001​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.5949999999998​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.231000000000222​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.435999999999694​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.77300000000014​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.932000000000244​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.30699999999979​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.925000000000182​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.682999999999993​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.7529999999997​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.376000000000204​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​17.213999999999942​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.333999999999833​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.97300000000041​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.243999999999687​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​17.079999999999927​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.41300000000001​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.623000000000047​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.291000000000167​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.791999999999916​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​17.05099999999993​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.75500000000011​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.353000000000065​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.87599999999975​</dt>​<key>​A​</key>​</timeframe>​<timeframe>​<dt>​16.457000000000335​</dt>​<key>​A​</key>​</timeframe>​</recording>​
`
  let parser = new DOMParser();
  let xml_object = parser.parseFromString(this.xml, 'text/xml');
  this.timestamps = xml_object.getElementsByTagName('timeframe');
  console.log(this.timestamps);
}

// Request that the player moves to the next frame
// Has to be seperate because the update is sometimes paused but the clocks are still 
// update-ing
RecordingPlayer.prototype.nextFrame = function () {
  this.frame_count++;
}

// Returns the dt value for the current frame
RecordingPlayer.prototype.getNextFrameDelta_ms = function() {
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
    keys[keyCode(key)] = true;
    this.keys.push(keyCode(key));
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