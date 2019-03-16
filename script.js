
var gates = []
var gate_index = -1;
var mousedown = false;
var win = new setUp();

var orClick = document.getElementById("or");
var andClick = document.getElementById("and");
var notClick = document.getElementById("not");
win.render();


orClick.onclick = function(){
    var newOr = new Or(win.ctx.canvas.width/2-50, win.ctx.canvas.height/10, win);
    newOr.render();
    gates.push(newOr);
    
} 
andClick.onclick = function(){
    var newAnd = new And(win.ctx.canvas.width/2-50, win.ctx.canvas.height/10, win);
    newAnd.render();
    gates.push(newAnd);
    
}
notClick.onclick = function(){
    var newNot = new Not(win.ctx.canvas.width/2-50, win.ctx.canvas.height/10, win);
    newNot.render();
    gates.push(newNot);
    
} 

function handleMouseDown(e){
    let cursorX = e.pageX;
    let cursorY = e.pageY;
    //find matching gate.
    gate_index = checkWhichGate(cursorX, cursorY);  // ==> returns gate index
    mousedown = true;
}

function handleMouseUp(e){
    mousedown = false;
    gate_index = -1;
}

function handleMouseMove(e){
    let cursorX = e.pageX;
    let cursorY = e.pageY;
    if(mousedown && gate_index != -1){
        gates[gate_index].update(cursorX, cursorY);
    }
}

function checkWhichGate(x, y){
    console.log(x, y);
    y = y-20;
    console.log(x, y);
    for(let i = gates.length-1; i >= 0; i--){

        
        if(x >= gates[i].x_pos && x <= gates[i].x_pos + gates[i].w)
            if(y >= gates[i].y_pos && y <= gates[i].y_pos + gates[i].h){
                return i;
            }
                
    }
    return -1;
}



function setUp(){
    this.can = document.getElementById("canvas");
    this.ctx = this.can.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.ctx.canvas.addEventListener("mousedown", handleMouseDown);
    this.ctx.canvas.addEventListener("mouseup", handleMouseUp);
    this.ctx.canvas.addEventListener("mousemove", handleMouseMove);

    this.render = function(){
        this.ctx.fillStyle = "antiquewhite";
        this.ctx.fillRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
        
    } 
}

function And(x, y, win){
    this.x_pos = x;
    this.y_pos = y;
    this.w = win.ctx.canvas.width / 30;
    this.h = win.ctx.canvas.height/ 10;
    this.color = "green";
    
    this.render = function(){
        //draw square        
        win.ctx.fillStyle = this.color;
        win.ctx.fillRect(this.x_pos, this.y_pos, this.w, this.h);
        //draw semi circle
        win.ctx.beginPath();
        win.ctx.arc(this.x_pos+this.w, this.y_pos+this.h/2, this.h/2, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        
        //draw input circles
        win.ctx.fillStyle = "gray";
        win.ctx.beginPath();
        win.ctx.arc(this.x_pos, this.y_pos+this.h/4, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.beginPath();
        win.ctx.arc(this.x_pos, this.y_pos+(this.h/4 * 3), this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        //draw output circle
        win.ctx.beginPath();
        win.ctx.arc(this.x_pos+this.w+this.h/2, this.y_pos+this.h/2, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        
    }
    this.update = function(cursorX, cursorY){
        this.x_pos = cursorX;
        this.y_pos = cursorY;
        win.render();
        gates.forEach(gate => {
            gate.render();
        });
        
    }

}

function Or(x, y, win){
    this.x_pos = x;
    this.y_pos = y;
    this.w = win.ctx.canvas.width / 30;
    this.h = win.ctx.canvas.height/ 10;
    this.color = "blue";
    
    this.render = function(){
        //draw square        
        win.ctx.fillStyle = this.color;
        win.ctx.fillRect(this.x_pos, this.y_pos, this.w, this.h);
        //draw triangle
        win.ctx.strokeStyle = this.color;
        win.ctx.beginPath();
        win.ctx.moveTo(this.x_pos+this.w, this.y_pos);
        win.ctx.lineTo((this.w/2)+this.x_pos+this.w, this.y_pos+this.h/2);
        win.ctx.lineTo(this.x_pos+this.w, this.y_pos+this.h);
        win.ctx.lineTo(this.x_pos+this.w, this.y_pos);
        win.ctx.closePath();
        win.ctx.fill();
        //draw input circles
        win.ctx.fillStyle = "gray";
        win.ctx.beginPath();
        win.ctx.arc(this.x_pos, this.y_pos+this.h/4, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.beginPath();
        win.ctx.arc(this.x_pos, this.y_pos+(this.h/4 * 3), this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        //draw output circle
        win.ctx.beginPath();
        win.ctx.arc((this.w/2)+this.x_pos+this.w, this.y_pos+this.h/2, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();

    }
    this.update = function(x,y){
        this.x_pos = x;
        this.y_pos = y;
        win.render();
        gates.forEach(gate => {
            gate.render();
        });
    }
}

function Not(x, y, win){
    this.x_pos = x;
    this.y_pos = y;
    this.w = win.ctx.canvas.width / 50;
    this.h = win.ctx.canvas.height/ 10;
    this.color = "red";
       
    this.render = function(){
        //draw triangle
        win.ctx.strokeStyle = this.color;
        win.ctx.fillStyle = this.color;
        win.ctx.beginPath();
        win.ctx.moveTo(this.x_pos, this.y_pos);
        win.ctx.lineTo((this.w/2)+this.x_pos+this.w, this.y_pos+this.h/2);
        win.ctx.lineTo(this.x_pos, this.y_pos+this.h);
        win.ctx.lineTo(this.x_pos, this.y_pos);
        win.ctx.closePath();
        win.ctx.fill();
        
        //draw input circle
        win.ctx.fillStyle = "gray";
        win.ctx.beginPath();
        win.ctx.arc(this.x_pos, this.y_pos+this.h/2, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();

        //draw output circle
        win.ctx.beginPath();
        win.ctx.arc((this.w/2)+this.x_pos+this.w, this.y_pos+this.h/2, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
    }

    this.update = function(x,y){
        this.x_pos = x;
        this.y_pos = y;
        win.render();
        gates.forEach(gate => {
            gate.render();
        });
    }
}
