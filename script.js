
var gates = []
var gate_index = -1;
var mousedown = false;
var win = new setUp();


var orClick = document.getElementById("or");
var andClick = document.getElementById("and");
var notClick = document.getElementById("not");
new And(0,0); //needed to load images ahead of clicking on them.
new Or(0,0);
new Not(0,0);
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

function handleMouseClick(e){
    
    // set output or input values for which gate. 
    // draw line

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
    this.ctx.canvas.addEventListener("click", handleMouseClick);

    this.render = function(){
        this.ctx.fillStyle = "antiquewhite";
        this.ctx.fillRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
    } 
}

function And(x, y, win){
    this.x_pos = x;
    this.y_pos = y;
    this.image = new Image();
    this.image.src = 'images/and.png';
    this.w = this.image.width;
    this.h = this.image.height;
    this.in1_pos = null;  //the position of the center of the circle for input 1
    this.in2_pos = null;
    this.out_pos = null;
    
    this.render = function(){
        // //draw input circles
        win.ctx.drawImage(this.image, this.x_pos, this.y_pos);
        this.calcInPositions();
        win.ctx.fillStyle = "gray";
        win.ctx.strokeStyle = "black";
        win.ctx.beginPath();
        win.ctx.arc(this.in1_pos.x, this.in1_pos.y, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
        win.ctx.beginPath();
        win.ctx.arc(this.in2_pos.x, this.in2_pos.y, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
        //draw output circle
        win.ctx.beginPath();
        win.ctx.arc(this.out_pos.x, this.out_pos.y, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
    }
    this.update = function(cursorX, cursorY){
        this.x_pos = cursorX;
        this.y_pos = cursorY;
        win.render();
        gates.forEach(gate => {
            gate.render();
        });
        
    }
    this.calcInPositions = function(){
        this.in1_pos ={
            x : this.x_pos,
            y : this.y_pos+this.h/4
        };
        this.in2_pos ={
            x : this.x_pos,
            y : this.y_pos+(this.h/4)*3
        };
        this.out_pos={
            x: this.x_pos+this.w,
            y: this.y_pos+this.h/2
        };
    }
    this.calcInPositions();


}

function Or(x, y, win){
    this.x_pos = x;
    this.y_pos = y;
    this.image = new Image();
    this.image.src = 'images/or.png';
    this.w = this.image.width;
    this.h = this.image.height;
    this.in1_pos = null;  //the position of the center of the circle for input 1
    this.in2_pos = null;
    this.out_pos = null;
    
    this.render = function(){
        // //draw input circles
        win.ctx.drawImage(this.image, this.x_pos, this.y_pos);
        this.calcInPositions();
        win.ctx.fillStyle = "gray";
        win.ctx.strokeStyle ="black";
        win.ctx.beginPath();
        win.ctx.arc(this.in1_pos.x, this.in1_pos.y, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
        win.ctx.beginPath();
        win.ctx.arc(this.in2_pos.x, this.in2_pos.y, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();

        //draw output circle
        win.ctx.beginPath();
        win.ctx.arc(this.out_pos.x, this.out_pos.y, this.h/10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
   
    }
    this.update = function(cursorX, cursorY){
        this.x_pos = cursorX;
        this.y_pos = cursorY;
        win.render();
        gates.forEach(gate => {
            gate.render();
        });
        
    }
    this.calcInPositions = function(){
        this.in1_pos ={
            x : this.x_pos,
            y : this.y_pos+this.h/4
        };
        this.in2_pos ={
            x : this.x_pos,
            y : this.y_pos+(this.h/4)*3
        };
        this.out_pos={
            x: this.x_pos+this.w,
            y: this.y_pos+this.h/2
        };
    }
    this.calcInPositions();

}

function Not(x, y, win){
    this.x_pos = x;
    this.y_pos = y;
    this.image = new Image();
    this.image.src = 'images/not.png';
    this.w = this.image.width;
    this.h = this.image.height;
    this.in1_pos = null;  //the position of the center of the circle for input 1
    this.out_pos = null;
    
    this.render = function(){
        console.log(this.image.width);
        // //draw input circles
        win.ctx.drawImage(this.image, this.x_pos, this.y_pos);
        this.calcInPositions();
        win.ctx.fillStyle = "gray";
        win.ctx.beginPath();
        win.ctx.arc(this.in1_pos.x, this.in1_pos.y, this.h/8, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
        //draw output circle
        win.ctx.beginPath();
        win.ctx.arc(this.out_pos.x, this.out_pos.y, this.h/8, 0, 2 * Math.PI);
        win.ctx.closePath();    
        win.ctx.fill();
        win.ctx.stroke();
            
    }
    this.update = function(cursorX, cursorY){
        this.x_pos = cursorX;
        this.y_pos = cursorY;
        win.render();
        gates.forEach(gate => {
            gate.render();
        });
        
    }
    this.calcInPositions = function(){
        this.in1_pos ={
            x : this.x_pos,
            y : this.y_pos+this.h/2
        };
        this.out_pos={
            x: this.x_pos+this.w,
            y: this.y_pos+this.h/2
        };
    }
    this.calcInPositions();

}