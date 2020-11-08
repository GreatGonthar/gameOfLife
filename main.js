let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.height = 800;
canvas.width = 800;
canvas.style = 'background:pink; border:1px solid black';
document.body.appendChild(canvas);

let size = 10;
let interval = 1;
let strings = canvas.height/(size+interval);
let columns = canvas.width/(size+interval);
class Cell {
    constructor(x, y, size, interval, colorOff, colorOn){
        this.x = x;
        this.y = y;
        this.size = size;
        this.interval = interval;
        this.colorOff = colorOff;
        this.colorOn = colorOn;
        this.mainColor = this.colorOff;
    }
    draw(){       
        ctx.fillStyle = this.mainColor;
        ctx.fillRect(this.x, this.y, this.size, this.size);  
    }
}

let myCell = [];
for (let i = 0; i < columns; i++){
    for (let j = 0; j < strings; j++){
        myCell.push(new Cell(i*(size+interval), j*(size+interval), size, interval, '#c0c0c0', '#000000'));         
    }    
}
for (let i = 0; i < myCell.length; i++){
    myCell[i].draw();  
}

canvas.onmousedown = function(event){
    console.log(event.clientX, event.clientY);
    let mouseX = event.clientX - 10;
    let mouseY = event.clientY - 10;
    for (let i = 0; i < myCell.length; i++){
        if (mouseX >= myCell[i].x && mouseX <= myCell[i].x+myCell[i].size &&
            mouseY >= myCell[i].y && mouseY <= myCell[i].y+myCell[i].size){
            if (myCell[i].mainColor == myCell[i].colorOff){    
                myCell[i].mainColor = myCell[i].colorOn;
            }else{
                myCell[i].mainColor = myCell[i].colorOff
            }
            myCell[i].draw();    
        }
    }

};