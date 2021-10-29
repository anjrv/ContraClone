// =========
// CONTRA
// =========
/*

A sort-of-playable version of the classic arcade game.

*/

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
  // we keep it here for future debugging functionality
  if (g_play_recording) RECORDINGPLAYER.setKeys();
}

// =================
// UPDATE SIMULATION
// =================

// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
  processDiagnostics();

  entityManager.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

let g_allowMixedActions = true;
let g_useGravity = true;
let g_useAveVel = true;
let g_renderSpatialDebug = false;
let g_play_recording = false;
let g_record = false;

const KEY_MIXED = keyCode('M');
const KEY_GRAVITY = keyCode('G');
const KEY_AVE_VEL = keyCode('V');
const KEY_SPATIAL = keyCode('X');
const KEY_HALT = keyCode('H');
const KEY_RESET = keyCode('R');
const KEY_0 = keyCode('0');
const KEY_1 = keyCode('1');
const KEY_2 = keyCode('2');
const KEY_K = keyCode('K');
const KEY_PLAY_RECORDING = keyCode('9');
const KEY_RECORD = keyCode('8');


function processDiagnostics() {
  if (eatKey(KEY_MIXED)) g_allowMixedActions = !g_allowMixedActions;

  if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

  if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

  if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

  if (eatKey(KEY_PLAY_RECORDING)) g_play_recording = true;

  if (eatKey(KEY_RECORD)) { 
    if (g_record) main.storeRecord();
    else main.createRecord();
    g_record = !g_record;
  }
}

// =================
// RENDER SIMULATION
// =================

// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `renderSimulation`

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
  entityManager.render(ctx);

  if (g_renderSpatialDebug) spatialManager.render(ctx);
}

// =============
// PRELOAD STUFF
// =============

const g_images = {};

// Makes sure everything is preloaded before initialization.
function requestPreloads() {
  const requiredImages = {
    character: './Sprites/palette.png'
  }
  imagesPreload(requiredImages, g_images, preloadDone);
}

const g_sprites = {};

function preloadDone() {
  g_sprites.character = new Sprite(g_images.character)
  entityManager.init();
  main.init();
}

// Kick it off
requestPreloads();
