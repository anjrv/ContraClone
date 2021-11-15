// =======
// GLOBALS
// =======
/*

Evil, ugly (but "necessary") globals, which everyone can use.

*/

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

const g_canvas = document.getElementById('myCanvas');
const g_ctx = g_canvas.getContext('2d');
const g_shopCanvas = document.getElementById('myShopCanvas');
const g_shopCtx = g_shopCanvas.getContext('2d');

const g_bulletSpeed = 10;
const g_worldOffsetX = g_canvas.width / 3;
const g_worldOffsetY = g_canvas.height / 2;

var g_pressStartFont = new FontFace(
  'PressStart2P',
  'url(fonts/PressStart2P-Regular.ttf)',
);
var g_ZenFont = new FontFace('ZenDots', 'url(fonts/ZenDots-Regular.ttf)');
var g_skip = false;
var g_intro = false;
var g_playing = false;

const g_aggroRange = 500;

var g_sprites = {};

var shop = false;

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
const NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
const SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;
