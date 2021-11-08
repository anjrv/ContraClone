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
const g_bulletSpeed = 15;
const g_worldOffsetX = g_canvas.width/4;
const g_worldOffsetY = g_canvas.height/2;
const g_playerEntryPos = 12;

var g_pressStartFont = new FontFace('PressStart2P', 'url(fonts/PressStart2P-Regular.ttf)');
var g_ZenFont = new FontFace('ZenDots', 'url(fonts/ZenDots-Regular.ttf)');
var g_skip = false;
var g_intro = false;
var g_playing = false;

// Starting positions in the spritesheet
var p_ssbX = 0;
var p_ssbY = 0;

// Sprite size
var p_size = 50;

// Number of sprites in row of spritesheet
var p_sn = 6;

// How big the sprite should be scaled
var p_scale = 2;

var p_realSize = p_scale * p_size;

// Size of the spriteSheet
var p_ssHeight = 2240;

// Calculate where the sprite should appear
// NOTE! It was made unnecessary after worldmap update
var p_ground = (p_ssHeight/2);

var p_ground2 = 0;

var g_shootCounter = -1;

var g_sprites = {};

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
const NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
const SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;
