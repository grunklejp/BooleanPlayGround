
var gates = []
var gate_index = -1;
var mousedown = false;
var InOutType = -1
var OutFlag = false;
var LastInputSelected = 0;
var lastClicked = null;
var win = new SetUp();
win.render();
var andImg = new Image();
var orImg = new Image();
var notImg = new Image();
andImg.src = "images/and.png";
orImg.src = "images/or.png";
notImg.src = "images/not.png";

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

function handleMouseClick(e){
    let X = e.pageX;
    let Y = e.pageY;
    let SelectedGate = checkInOutGate(X, Y);
    if (SelectedGate[0] == null)
        return;
    if (SelectedGate.length == 2){                  // input was selected
        if(InOutType == -1 || InOutType == 1){      // neither was looking for match  
            lastClicked = SelectedGate[0];
            InOutType = 1;
                                  
        }else if(InOutType == 0){                   // last clicked was output -->connect in to outs
            if(SelectedGate[1] == 1){
                SelectedGate[0].in1 = lastClicked;
            }else{
                SelectedGate[0].in2 = lastClicked;
            }
            InOutType = -1;
            SelectedGate[0].render();                         //resets so that neither were clicked
        }
        LastInputSelected = SelectedGate[1];
    }else{
        if(InOutType == -1 || InOutType == 0){      // neither was selected     
            lastClicked = SelectedGate[0];          
            InOutType = 0;                      
        } else if(InOutType = 1){                   // last clicked was input
            if(LastInputSelected == 1){
                lastClicked.in1 = SelectedGate[0];
            }else{
                lastClicked.in2 = SelectedGate[0];
            }
            InOutType = -1;
            lastClicked.render();
        }
    }
}

function handleMouseDown(e){
    let cursorX = e.pageX;
    let cursorY = e.pageY;
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

// checks which gates was clicked on
function checkWhichGate(x, y){
    for(let i = gates.length-1; i >= 0; i--){
        if(x >= gates[i].x_pos && x <= gates[i].x_pos + gates[i].w)
            if(y >= gates[i].y_pos && y <= gates[i].y_pos + gates[i].h){
                return i;
            }
                
    }
    return -1;
}

function checkInOutGate(x, y){
    
    if (gates[0] == null)
        return [null];

    let inIndex = checkWhichGate(x + gates[0].h/10, y);
    let outIndex = checkWhichGate(x - gates[0].h/10, y);

    if (outIndex != -1){
        let gate = gates[outIndex];
        //output was possibly selected
        //check if in output
        if(checkInside(gate.out_pos.x, gate.out_pos.y, gate.h/10, x, y))
            return [gate];

    }else if(inIndex != -1 && outIndex == -1){
        let gate = gates[inIndex];
        //input was possibly selected
        //check if (x, y) in gates[inIndex].in1_pos
        if(checkInside(gate.in1_pos.x, gate.in1_pos.y, gate.h/10, x, y))
            return [gate, 1];
        //check if (x, y) in gates[inIndex].in2_pos
        try {
            if(checkInside(gate.in2_pos.x, gate.in2_pos.y, gate.h/10, x, y)) //throws error for if NOT gate
                return [gate, 2];
        } catch (error) {}
        return [null];
    }else{   //no out or input selected

        return [null];
    }
}

function checkInside(cir_x, cir_y, r, x, y){
    // needs better circle function. currently checks if in square
    if (x < cir_x + r && x >cir_x - r && y < cir_y + r && y > cir_y - r)
        return true;
    return false;
}

function SetUp(){
    this.can = document.getElementById("canvas");
    this.ctx = this.can.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.ctx.canvas.addEventListener("mousedown", handleMouseDown);    //   Handles
    this.ctx.canvas.addEventListener("mouseup", handleMouseUp);        //   Drag &
    this.ctx.canvas.addEventListener("mousemove", handleMouseMove);    //   Drop
    this.ctx.canvas.addEventListener("click", handleMouseClick);    // Handles linking gates

    this.render = function(){
        this.ctx.fillStyle = "antiquewhite";
        this.ctx.fillRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
    } 
}

function And(x, y, win, img){
    this.x_pos = x;
    this.y_pos = y;
    this.image = img;
    this.w = this.image.width;
    this.h = this.image.height;
    this.in1 = null;
    this.in2 = null;
    this.out = null;
    this.state = false;
    this.in1_pos = null;  //the position of the center of the circle for input 1
    this.in2_pos = null;
    this.out_pos = null;
    
    this.render = function(){
        win.ctx.drawImage(this.image, this.x_pos, this.y_pos);
        this.calcInPositions();
        //draw lines
        if(this.in1 != null){
            win.ctx.beginPath();
            win.ctx.moveTo(this.in1_pos.x, this.in1_pos.y);
            win.ctx.lineTo(this.in1.out_pos.x, this.in1.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
            
        }
        if(this.in2 != null){
            win.ctx.beginPath();
            win.ctx.moveTo(this.in2_pos.x, this.in2_pos.y);
            win.ctx.lineTo(this.in2.out_pos.x, this.in2.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
            
        }
        //draw input circles
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
    this.renderSelection = function(num){
        if (num == 1){
            win.ctx.fillStyle = "lightgray";
            win.ctx.beginPath();
            win.ctx.arc(this.in1_pos.x, this.in1_pos.y, this.h/8, 0, 2 * Math.PI);
            win.ctx.closePath();
            win.ctx.fill();
            win.ctx.stroke();
        }else if(num == 2){
            win.ctx.fillStyle = "lightgray";
            win.ctx.beginPath();
            win.ctx.arc(this.in2_pos.x, this.in2_pos.y, this.h/8, 0, 2 * Math.PI);
            win.ctx.closePath();
            win.ctx.fill();
            win.ctx.stroke();
        } else{
            win.ctx.fillStyle = "lightgray";
            win.ctx.beginPath();
            win.ctx.arc(this.out_pos.x, this.out_pos.y, this.h/8, 0, 2 * Math.PI);
            win.ctx.closePath();
            win.ctx.fill();
            win.ctx.stroke();
        }
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

function Or(x, y, win, img){
    this.x_pos = x;
    this.y_pos = y;
    this.image = img;
    this.w = this.image.width;
    this.h = this.image.height;
    this.in1_pos = null;  //the position of the center of the circle for input 1
    this.in2_pos = null;
    this.out_pos = null;
    this.in1 = null;
    this.in2 = null;
    this.out = null;

    this.render = function(){
        win.ctx.drawImage(this.image, this.x_pos, this.y_pos);
        this.calcInPositions();
        //draw input --> output lines
        if(this.in1 != null){
            win.ctx.beginPath();
            win.ctx.moveTo(this.in1_pos.x, this.in1_pos.y);
            win.ctx.lineTo(this.in1.out_pos.x, this.in1.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
            
        }
        if(this.in2 != null){
            win.ctx.beginPath();
            win.ctx.moveTo(this.in2_pos.x, this.in2_pos.y);
            win.ctx.lineTo(this.in2.out_pos.x, this.in2.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
            
        }
        //draw input circles
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
    this.renderSelection = function(num){
        if (num == 1){
            win.ctx.fillStyle = "lightgray";
            win.ctx.beginPath();
            win.ctx.arc(this.in1_pos.x, this.in1_pos.y, this.h/8, 0, 2 * Math.PI);
            win.ctx.closePath();
            win.ctx.fill();
            win.ctx.stroke();
        }else if(num == 2){
            win.ctx.fillStyle = "lightgray";
            win.ctx.beginPath();
            win.ctx.arc(this.in2_pos.x, this.in2_pos.y, this.h/8, 0, 2 * Math.PI);
            win.ctx.closePath();
            win.ctx.fill();
            win.ctx.stroke();
        } else{
            win.ctx.fillStyle = "lightgray";
            win.ctx.beginPath();
            win.ctx.arc(this.out_pos.x, this.out_pos.y, this.h/8, 0, 2 * Math.PI);
            win.ctx.closePath();
            win.ctx.fill();
            win.ctx.stroke();
        }
    }
    this.calcInPositions = function(){
        this.in1_pos ={
            x : this.x_pos,
            y : this.y_pos+this.h/4,
            
        };
        this.in2_pos ={
            x : this.x_pos,
            y : this.y_pos+(this.h/4)*3,
            
        };
        this.out_pos={
            x: this.x_pos+this.w,
            y: this.y_pos+this.h/2,
            
        };
    }
    this.calcInPositions();

}

function Not(x, y, win, img){
    this.x_pos = x;
    this.y_pos = y;
    this.image = img;
    this.w = this.image.width;
    this.h = this.image.height;
    this.in1 = null;
    this.out = null;
    this.in1_pos = null;  //the position of the center of the circle for input 1
    this.out_pos = null;
    
    this.render = function(){
        win.ctx.drawImage(this.image, this.x_pos, this.y_pos);
        this.calcInPositions();
        //draw lines
        if(this.in1 != null){
            win.ctx.beginPath();
            win.ctx.moveTo(this.in1_pos.x, this.in1_pos.y);
            win.ctx.lineTo(this.in1.out_pos.x, this.in1.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
            
        }

        //draw input circles
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
    this.renderSelection = function(num){
        if (num == 1){
            win.ctx.fillStyle = "lightgray";
            win.ctx.beginPath();
            win.ctx.arc(this.in1_pos.x, this.in1_pos.y, this.h/8, 0, 2 * Math.PI);
            win.ctx.closePath();
            win.ctx.fill();
            win.ctx.stroke();
        }else {
            win.ctx.fillStyle = "lightgray";
            win.ctx.beginPath();
            win.ctx.arc(this.out_pos.x, this.out_pos.y, this.h/8, 0, 2 * Math.PI);
            win.ctx.closePath();
            win.ctx.fill();
            win.ctx.stroke();
        }
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

