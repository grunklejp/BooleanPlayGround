/* this files defines global variables and starts program execution */

var gates = []
var gate_index = -1;
var mousedown = false;
var InOutType = -1
var OutFlag = false;
var LastInputSelected = 0;
var lastClicked = null;
var win = new Frame();
win.render();
var andImg = new Image();
var orImg = new Image();
var notImg = new Image();
var cursorX;
var cursorX;
andImg.src = "images/and.png";
orImg.src = "images/or.png";
notImg.src = "images/not.png";
setInterval(updateGates, 500);
