/* this file defines helper functions */

function updateGates() {
    win.render();
    for (let i = 0; i < gates.length; i++) {
        gates[i].render();
    }
}

// checks which gates was clicked on
function checkWhichGate(x, y) {
    for (let i = gates.length - 1; i >= 0; i--) {
        if (x >= gates[i].x_pos && x <= gates[i].x_pos + gates[i].w)
            if (y >= gates[i].y_pos && y <= gates[i].y_pos + gates[i].h) {
                return i;
            }

    }
    return -1;
}

function checkInOutGate(x, y) {

    if (gates[0] == null)
        return [null];

    let inIndex = checkWhichGate(x + gates[0].h / 10, y);
    let outIndex = checkWhichGate(x - gates[0].h / 10, y);
    console.log()

    //dot was clicked 
    if (inIndex != -1 && gates[inIndex].type === "dot") {
        console.log("dot clicked");
    }

    if (outIndex != -1) {
        let gate = gates[outIndex];
        //output was possibly selected
        //check if in output
        if (checkInside(gate.out_pos.x, gate.out_pos.y, gate.h / 10, x, y))
            return [gate];

    } else if (inIndex != -1 && outIndex == -1) {
        let gate = gates[inIndex];
        //input was possibly selected
        //check if (x, y) in gates[inIndex].in1_pos
        if (checkInside(gate.in1_pos.x, gate.in1_pos.y, gate.h / 10, x, y))
            return [gate, 1];
        //check if (x, y) in gates[inIndex].in2_pos
        try {
            if (checkInside(gate.in2_pos.x, gate.in2_pos.y, gate.h / 10, x, y)) //throws error for if NOT gate
                return [gate, 2];
        } catch (error) { }
        return [null];
    } else {   //no out or input selected

        return [null];
    }
}

function checkInside(cir_x, cir_y, r, x, y) {
    // needs better circle function. currently checks if in square
    if (x < cir_x + r && x > cir_x - r && y < cir_y + r && y > cir_y - r)
        return true;
    return false;
}
