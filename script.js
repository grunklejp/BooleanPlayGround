can = document.getElementById("canvas");
ctx = can.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0,0, 50, 50);
var jp = "Loser"
setInterval(update, 50);

function update(){
    console.log(jp);
}