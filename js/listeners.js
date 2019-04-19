/* 
this file defines EventListeners that handle user input pertaining to the canvas 
*/

function handleMouseClick(e) {
    let X = e.pageX;
    let Y = e.pageY;
    let SelectedGate = checkInOutGate(X, Y);
    if (SelectedGate == undefined || SelectedGate[0] == null)
        return;
    if (SelectedGate.length == 2) {                  // input was selected
        if (InOutType == -1 || InOutType == 1) {      // neither was looking for match  
            if (lastClicked != null && lastClicked === SelectedGate[0]) {

                //check that sameinputs were cliked
                if (LastInputSelected === SelectedGate[1])
                    if (SelectedGate[1] === 1) {
                        if (lastClicked.in1 === null || lastClicked.in1.state === false)
                            lastClicked.in1 = { state: true };
                        else if (lastClicked.in1.state === true)
                            lastClicked.in1 = { state: false };
                    } else {
                        if (lastClicked.in2 === null || lastClicked.in2.state === false)
                            lastClicked.in2 = { state: true };
                        else if (lastClicked.in2.state === true)
                            lastClicked.in2 = { state: false };
                    }
            }
            lastClicked = SelectedGate[0];
            InOutType = 1;


        } else if (InOutType == 0) {                   // last clicked was output -->connect in to outs
            if (SelectedGate[1] == 1) {
                SelectedGate[0].in1 = lastClicked;
            } else {
                SelectedGate[0].in2 = lastClicked;
            }
            InOutType = -1;
            //resets so that neither were clicked
        }
        updateGates();
        LastInputSelected = SelectedGate[1];
    } else {
        if (InOutType == -1 || InOutType == 0) {      // neither was selected     
            lastClicked = SelectedGate[0];
            InOutType = 0;
        } else if (InOutType = 1) {                   // last clicked was input
            if (LastInputSelected == 1) {
                lastClicked.in1 = SelectedGate[0];
            } else {
                lastClicked.in2 = SelectedGate[0];
            }
            InOutType = -1;
            updateGates();
        }
    }
}

function handleMouseDown(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;

    gate_index = checkWhichGate(cursorX, cursorY);  // ==> returns gate index
    mousedown = true;
}

function handleMouseUp(e) {
    if (gates[gate_index].x_pos < trash.x && gates[gate_index].y_pos > trash.y) {
        //if(gates[gate_index].out != null )
        gates.splice(gate_index, 1);

    }
    mousedown = false;
    gate_index = -1;
}

function handleMouseMove(e) {
    let X = e.pageX;
    let Y = e.pageY;
    if (mousedown && gate_index != -1) {
        let temp = gates[gate_index];
        xdiff = cursorX - X;
        ydiff = cursorY - Y
        cursorX = X;
        cursorY = Y;
        temp.update(temp.x_pos - xdiff, temp.y_pos - ydiff);
    }
}
