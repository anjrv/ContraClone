// ==============
// MOUSE HANDLING
// ==============

'use strict';

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

let g_mouseX = 0,
  g_mouseY = 0;
let g_mouse_buttons = {};

function handleMouse(evt) {
  if (evt.clientX - g_canvas.offsetLeft >= 0 && evt.clientX - g_canvas.offsetLeft <= g_canvas.width)
    evt.preventDefault();
  else return
  g_mouseX = evt.clientX - g_canvas.offsetLeft;
  g_mouseY = evt.clientY - g_canvas.offsetTop;

  // If no button is being pressed, then bail
  const button = evt.buttons === undefined ? evt.which : evt.buttons;
  for (const key in g_mouse_buttons) {
    g_mouse_buttons[key] = false;
  }
  g_mouse_buttons[button] = true;
}

// Handle "down" and "move" events the same way.
window.addEventListener('mousedown', handleMouse);
window.addEventListener('mouseup', handleMouse);
window.addEventListener('mousemove', handleMouse);
// Removes the context menu to allow for rightclicks without opening the menu
document.oncontextmenu = () => { return false };
