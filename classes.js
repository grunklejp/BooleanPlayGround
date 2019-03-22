/* file of classes */


class Frame {
    constructor() {
        this.can = document.getElementById("canvas");
        this.ctx = this.can.getContext('2d');
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.canvas.addEventListener("mousedown", handleMouseDown); //   Handles
        this.ctx.canvas.addEventListener("mouseup", handleMouseUp); //   Drag &
        this.ctx.canvas.addEventListener("mousemove", handleMouseMove); //   Drop
        this.ctx.canvas.addEventListener("click", handleMouseClick); // Handles linking gates
        
    }
    render() {
        this.ctx.fillStyle = "antiquewhite";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}

class And {
    constructor(x, y, win, img) {
        this.x_pos = x;
        this.y_pos = y;
        this.image = img;
        this.w = this.image.width;
        this.h = this.image.height;
        this.in1 = null;
        this.in2 = null;
        this.out = null;
        this.in1_pos = null; //the position of the center of the circle for input 1
        this.in2_pos = null;
        this.out_pos = null;
        this.state = false;
        this.calcInPositions();

    }
    checkState(){
        let in1 = false;
        let in2 = false;
        if (this.in1 != null && this.in1.state == true)
            in1 = true;
        if (this.in2 != null && this.in2.state == true)
            in2 = true;
        this.state = in1 && in2;
    }

    render() {
        this.checkState();
        win.ctx.drawImage(this.image, this.x_pos, this.y_pos);
        this.calcInPositions();
        win.ctx.lineWidth = 3;
        //draw lines
        if (this.in1 != null && this.in1.out_pos != null) {
            if (this.in1.state == true)
                win.ctx.strokeStyle = "red";
            else
                win.ctx.strokeStyle = "black";
            win.ctx.beginPath();
            win.ctx.moveTo(this.in1_pos.x, this.in1_pos.y);
            win.ctx.lineTo(this.in1.out_pos.x, this.in1.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
        }
        if (this.in2 != null && this.in2.out_pos != null) {
            if (this.in2.state == true)
                win.ctx.strokeStyle = "red";
            else
                win.ctx.strokeStyle = "black";
            win.ctx.beginPath();
            win.ctx.moveTo(this.in2_pos.x, this.in2_pos.y);
            win.ctx.lineTo(this.in2.out_pos.x, this.in2.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
        }
        //draw input circles
        win.ctx.strokeStyle = "black";
        win.ctx.fillStyle = "gray";
        win.ctx.lineWidth = 1;
        if (this.in1 != null) {
            if (this.in1.state == true)
                win.ctx.fillStyle = "red";
        }
        win.ctx.beginPath();
        win.ctx.arc(this.in1_pos.x, this.in1_pos.y, this.h / 10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
        win.ctx.fillStyle = "gray";
        if (this.in2 != null) {
            if (this.in2.state == true)
                win.ctx.fillStyle = "red";
        }
        win.ctx.beginPath();
        win.ctx.arc(this.in2_pos.x, this.in2_pos.y, this.h / 10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
        win.ctx.fillStyle = "gray";
        //draw output circle
        if (this.state == true) {
            win.ctx.fillStyle = "red";
        }
        win.ctx.beginPath();
        win.ctx.arc(this.out_pos.x, this.out_pos.y, this.h / 10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
    }
    update(cursorX, cursorY) {
        this.x_pos = cursorX;
        this.y_pos = cursorY;
        updateGates();
    }
    calcInPositions() {
        this.in1_pos = {
            x: this.x_pos,
            y: this.y_pos + this.h / 4
        };
        this.in2_pos = {
            x: this.x_pos,
            y: this.y_pos + (this.h / 4) * 3
        };
        this.out_pos = {
            x: this.x_pos + this.w,
            y: this.y_pos + this.h / 2
        };
    }
}




class Or {
    constructor(x, y, win, img) {
        this.x_pos = x;
        this.y_pos = y;
        this.image = img;
        this.w = this.image.width;
        this.h = this.image.height;
        this.in1_pos = null; //the position of the center of the circle for input 1
        this.in2_pos = null;
        this.out_pos = null;
        this.in1 = null;
        this.in2 = null;
        this.out = null;
        this.state = false;
        this.calcInPositions();

    }
    checkState() {
        let in1 = false;
        let in2 = false;
        if (this.in1 != null && this.in1.state == true)
            in1 = true;
        if (this.in2 != null && this.in2.state == true)
            in2 = true;
        this.state = in1 || in2;
    }

    render() {
        this.checkState();
        win.ctx.drawImage(this.image, this.x_pos, this.y_pos);
        this.calcInPositions();
        win.ctx.lineWidth = 3;
        //draw input --> output lines
        if (this.in1 != null && this.in1.out_pos != null) {
            if (this.in1.state == true)
                win.ctx.strokeStyle = "red";
            else
                win.ctx.strokeStyle = "black";
            win.ctx.beginPath();
            win.ctx.moveTo(this.in1_pos.x, this.in1_pos.y);
            win.ctx.lineTo(this.in1.out_pos.x, this.in1.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
        }
        if (this.in2 != null && this.in2.out_pos != null) {
            if (this.in2.state == true)
                win.ctx.strokeStyle = "red";
            else
                win.ctx.strokeStyle = "black";
            win.ctx.beginPath();
            win.ctx.moveTo(this.in2_pos.x, this.in2_pos.y);
            win.ctx.lineTo(this.in2.out_pos.x, this.in2.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
        }
        //draw input circles
        win.ctx.strokeStyle = "black";
        win.ctx.fillStyle = "gray";
        win.ctx.lineWidth = 1;
        if (this.in1 != null) {
            if (this.in1.state == true)
                win.ctx.fillStyle = "red";
        }
        win.ctx.beginPath();
        win.ctx.arc(this.in1_pos.x, this.in1_pos.y, this.h / 10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
        win.ctx.fillStyle = "gray";
        if (this.in2 != null) {
            if (this.in2.state == true)
                win.ctx.fillStyle = "red";
        }
        win.ctx.beginPath();
        win.ctx.arc(this.in2_pos.x, this.in2_pos.y, this.h / 10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
        win.ctx.fillStyle = "gray";
        //draw output circle
        if (this.state == true)
            win.ctx.fillStyle = "red";
        win.ctx.beginPath();
        win.ctx.arc(this.out_pos.x, this.out_pos.y, this.h / 10, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
    }

    update(cursorX, cursorY) {
        this.x_pos = cursorX;
        this.y_pos = cursorY;
        updateGates();
    }

    calcInPositions = function () {
        this.in1_pos = {
            x: this.x_pos,
            y: this.y_pos + this.h / 4,
        };
        this.in2_pos = {
            x: this.x_pos,
            y: this.y_pos + (this.h / 4) * 3,
        };
        this.out_pos = {
            x: this.x_pos + this.w,
            y: this.y_pos + this.h / 2,
        };
    }
}

class Not {
    constructor(x, y, win, img) {
        this.x_pos = x;
        this.y_pos = y;
        this.image = img;
        this.w = this.image.width;
        this.h = this.image.height;
        this.in1 = null;
        this.out = null;
        this.in1_pos = null; //the position of the center of the circle for input 1
        this.out_pos = null;
        this.state = true;
        this.calcInPositions();
        
    }
    checkState() {
        let in1 = false;
        if (this.in1 != null && this.in1.state == true)
            in1 = true;
        this.state = !in1;
    }
    render(){
        this.checkState();
        win.ctx.drawImage(this.image, this.x_pos, this.y_pos);
        this.calcInPositions();
        win.ctx.lineWidth = 3;
        //draw lines
        if (this.in1 != null && this.in1.out_pos != null) {
            if (this.in1.state == true)
                win.ctx.strokeStyle = "red";
            else
                win.ctx.strokeStyle = "black";
            win.ctx.beginPath();
            win.ctx.moveTo(this.in1_pos.x, this.in1_pos.y);
            win.ctx.lineTo(this.in1.out_pos.x, this.in1.out_pos.y);
            win.ctx.closePath();
            win.ctx.stroke();
        }
        //draw input circles
        win.ctx.strokeStyle = "black";
        win.ctx.lineWidth = 1;
        win.ctx.fillStyle = "gray";
        if (this.in1 != null) {
            if (this.in1.state == true)
                win.ctx.fillStyle = "red";
        }
        win.ctx.beginPath();
        win.ctx.arc(this.in1_pos.x, this.in1_pos.y, this.h / 8, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
        win.ctx.fillStyle = "gray";
        //draw output circle
        if (this.state == true)
            win.ctx.fillStyle = "red";
        win.ctx.beginPath();
        win.ctx.arc(this.out_pos.x, this.out_pos.y, this.h / 8, 0, 2 * Math.PI);
        win.ctx.closePath();
        win.ctx.fill();
        win.ctx.stroke();
    }

    update(){
        this.x_pos = cursorX;
        this.y_pos = cursorY;
        updateGates();
    }
    

    calcInPositions() {
        this.in1_pos = {
            x: this.x_pos,
            y: this.y_pos + this.h / 2
        };
        this.out_pos = {
            x: this.x_pos + this.w,
            y: this.y_pos + this.h / 2
        };
    }
}

