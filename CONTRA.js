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

  worldMap.update(du);
  entityManager.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

// let g_allowMixedActions = true;
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
  worldMap.render(ctx);
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
    palette       :   './Sprites/palette.png',
    player        :   './Sprites/char-sheet-alpha.png',
    impactWhite   :   './Sprites/impacts-sheet-colour-1-alpha.png',
    impactAcid    :   './Sprites/impacts-sheet-colour-2-alpha.png',
    impactFire    :   './Sprites/impacts-sheet-colour-3-alpha.png',
    impactPlasma  :   './Sprites/impacts-sheet-colour-4-alpha.png',
    impactSun     :   './Sprites/impacts-sheet-colour-5-alpha.png',
    explosion     :   './Sprites/jrob774-explosion_2-sheet-alpha.png',
    powerups      :   './Sprites/powerups-sheet-alpha.png',
    projectiles   :   './Sprites/updated_projectiles-sheet-alpha.png',
    flashWhite    :   './Sprites/weaponflash-sheet-colour-1-alpha.png',
    flashAcid     :   './Sprites/weaponflash-sheet-colour-2-alpha.png',
    flashFire     :   './Sprites/weaponflash-sheet-colour-3-alpha.png',
    flashPlasma   :   './Sprites/weaponflash-sheet-colour-4-alpha.png',
    flashSun      :   './Sprites/weaponflash-sheet-colour-5-alpha.png',
    enemies       :   './Sprites/enemies-sheet-alpha.png'
  }
  imagesPreload(requiredImages, g_images, preloadDone);
}

const g_sprites = {};

function preloadDone() {
  g_sprites.palette      = new Sprite(g_images.palette)
  g_sprites.player       = new Sprite(g_images.player, 6, 48, 46, 46);
  g_sprites.player.animations = {
    IDLE: [0],
    LOOK_DOWN: [216],
    LOOK_UP: [72],
    RUN_FORWARD: [2,3,4,5],
    RUN_FORWARD_UP: [38,39,40,41],
    RUN_FORWARD_DOWN: [260,261,262,263],
    CROUCH: [1]
  };
  g_sprites.impactWhite  = new Sprite(g_images.impactWhite)
  g_sprites.impactAcid   = new Sprite(g_images.impactAcid)
  g_sprites.impactFire   = new Sprite(g_images.impactFire)
  g_sprites.impactPlasma = new Sprite(g_images.impactPlasma)
  g_sprites.impactSun    = new Sprite(g_images.impactSun)
  g_sprites.explosion    = new Sprite(g_images.explosion)
  g_sprites.powerups     = new Sprite(g_images.powerups)
  g_sprites.projectiles  = new Sprite(g_images.projectiles, 13, 7, 28, 28)
  g_sprites.projectiles.animations = {
    LASER: [0]
  };
  g_sprites.flashWhite   = new Sprite(g_images.flashWhite)
  g_sprites.flashAcid    = new Sprite(g_images.flashAcid)
  g_sprites.flashFire    = new Sprite(g_images.flashFire)
  g_sprites.flashPlasma  = new Sprite(g_images.flashPlasma)
  g_sprites.flashSun     = new Sprite(g_images.flashSun)
  g_sprites.enemies      = new Sprite(g_images.enemies)
  entityManager.init();
  worldMap.init(level1);
  main.init();
}

// Kick it off
requestPreloads();
