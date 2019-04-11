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
var dotImg = new Image();
var cursorX;
var cursorX;
andImg.src = "images/and_stylized.png";
orImg.src = "images/or_stylized_revised.png";
notImg.src = "images/not_stylized.png";
dotImg.src = "images/not.png";

var trash = {
    x : window.innerWidth / 10,
    y : window.innerHeight - window.innerHeight /9
};

setInterval(updateGates, 500);

