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
const g_bulletSpeed = 5;

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
const NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
const SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;
