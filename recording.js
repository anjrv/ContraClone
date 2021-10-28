function Debugger() {
  this.number_of_frames = 0;
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
      <key>SPACE</key>
    </timestep>
  </recording>`
  let parser = new DOMParser();
  let xml_object = parser.parseFromString(this.xml, 'text/xml');
  this.timestamps = xml_object.getElementsByTagName('timestep');
  console.log(this.timestamps);
}

Debugger.prototype.get_next_frametime_delta = function() {
  this.cleanupKeys();

  if (this.number_of_frames >= this.timestamps.length) {
    this.number_of_frames = 0;
    g_play_recording = false;
    return 16;
  }

  let dt = this.timestamps[this.number_of_frames]
    .getElementsByTagName('dt')[0]
    .innerHTML;
  
  let keys_this_frame = this.timestamps[this.number_of_frames]
    .getElementsByTagName('key');


  for (let i = 0; i < keys_this_frame.length; i++) {
    let key = keys_this_frame[i].innerHTML;
    keys[keyCode(key)] = true;
    this.keys.push(key);
  }
  

  this.number_of_frames++;
  return dt;
}

Debugger.prototype.cleanupKeys = function () {
  for (let i = this.keys.length - 1; i >= 0; i--) {
    keys[keyCode(this.keys[i])] = false;
    this.keys.splice(i, 1);
  }
}




const DEBUGGER = new Debugger();