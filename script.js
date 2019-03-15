

win = new setUp();
win.render();

var a = new And(0,0, win);
a.render();

function setUp(){
    this.can = document.getElementById("canvas");
    this.ctx = this.can.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;

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
    this.color = "red";
    
    
    this.render = function(){
        //draw square        
        win.ctx.fillStyle = this.color;
        win.ctx.fillRect(this.x_pos, this.y_pos, this.w, this.h);
        //draw semi circle
        win.ctx.strokeStyle = this.color;
        win.ctx.beginPath();

        win.ctx.arc(this.x_pos+this.w, this.y_pos+this.h/2, this.h/2, 0, 2 * Math.PI);
        win.ctx.stroke();
        win.ctx.fill();
        //draw tiny circle
    }
}