   /* 
   this file defines functions and eventlisteners 
   that reference elements outside of the canvas 
   */

var orClick = document.getElementById("or");
var andClick = document.getElementById("and");
var notClick = document.getElementById("not");

orClick.onclick = function(){
    var newOr = new Or(win.ctx.canvas.width/2-50, win.ctx.canvas.height/10, win, orImg);
    newOr.render();
    gates.push(newOr);  
} 
andClick.onclick = function(){
    var newAnd = new And(win.ctx.canvas.width/2-50, win.ctx.canvas.height/10, win, andImg);
    newAnd.render();
    gates.push(newAnd);  
}
notClick.onclick = function(){
    var newNot = new Not(win.ctx.canvas.width/2-50, win.ctx.canvas.height/10, win, notImg);
    newNot.render();
    gates.push(newNot); 
}