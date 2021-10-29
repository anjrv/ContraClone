//  RecordingPlayer class that can provide dt values to the _update_clocks routine in main
// and simultanuously set all the pressed down keys to true

// Constructor
function RecordingPlayer() {
  this.frame_count = 0;
  this.keys = [];
  this.xml = `<recording><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.01299999999901</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.351000000000568</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.022000000000844</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.962999999999738</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.625</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.396999999999025</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.970000000001164</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.627000000000407</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.35099999999875</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.980999999999767</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.63500000000022</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.655000000000655</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.26800000000003</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.063000000000102</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.26000000000022</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.001000000000204</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.054000000000087</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.226999999998952</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.700000000000728</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.65099999999984</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.756999999999607</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.63800000000083</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.72899999999936</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.58599999999933</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.71600000000035</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>15.962999999999738</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.13000000000102</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.87699999999859</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.625</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.657000000001062</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.665999999999258</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.64600000000064</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.376000000000204</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.950999999999112</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.542999999999665</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.81800000000112</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.67200000000048</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>15.970999999999549</dt><key> </key></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.98400000000038</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.326999999999316</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.05500000000029</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.68000000000029</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.287999999998647</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.615999999999985</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.316000000000713</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.255999999999403</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.079000000001543</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.644999999998618</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.07300000000032</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.14099999999962</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.840000000000146</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.504000000000815</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.774999999999636</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.096999999999753</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.983000000000175</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.417999999999665</dt><key> </key></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.506999999999607</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.14900000000125</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.825999999999112</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.611000000000786</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.049999999999272</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.024999999999636</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.96600000000035</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.621000000001004</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.28899999999885</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.01800000000003</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.368000000000393</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.97700000000077</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.190999999998894</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.17699999999968</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.62300000000141</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.373999999999796</dt><key> </key></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.75</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.193999999999505</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.070999999999913</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.49200000000019</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.454999999999927</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>17.2450000000008</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.690999999998894</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.494000000000597</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.875</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.61700000000019</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.47099999999955</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.90899999999965</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.60400000000118</dt></timeframe><timeframe xmlns="http://www.w3.org/1999/xhtml"><dt>16.52599999999984</dt><key>8</key></timeframe></recording>
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