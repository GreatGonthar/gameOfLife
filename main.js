let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.height = 800;
canvas.width = 800;
canvas.style = 'background:pink; border:1px solid black';
document.body.appendChild(canvas);

let size = 3;
let interval = 1;
let strings = Math.round(canvas.height/(size+interval));
let columns = Math.round(canvas.width/(size+interval));
class Cell {
    constructor(x, y, size, interval, colorOff, colorOn){
        this.x = x;
        this.y = y;
        this.size = size;
        this.interval = interval;
        this.colorOff = colorOff;
        this.colorOn = colorOn;
        this.mainColor = this.colorOff;
        this.neighbors = 0;
    }
    draw(){       
        ctx.fillStyle = this.mainColor;
        ctx.fillRect(this.x, this.y, this.size, this.size);  
    }
}

let myCell = [];
for (let i = 0; i < columns; i++){
    for (let j = 0; j < strings; j++){
        myCell.push(new Cell(j*(size+interval), i*(size+interval), size, interval, '#c0c0c0', '#000000'));         
    }    
}


setInterval(mainLoop, 2);

function mainLoop(){        
    for (let i = 0; i < myCell.length; i++){
    //    if (i/columns == Math.floor(i/columns))
            // проверяем наличие соседей, и добавляем их в счетчик
            if (i > columns && (i/columns) != Math.floor(i/columns) && ((i+1)/columns) != Math.floor((i+1)/columns) && i < (columns * strings) - columns){

                if (myCell[i+1].mainColor == myCell[0].colorOn){
                    myCell[i].neighbors++;                
                }                  
                if (myCell[i+columns+1].mainColor == myCell[0].colorOn){
                    myCell[i].neighbors++;                
                }      
                if (myCell[i-1].mainColor == myCell[0].colorOn){
                    myCell[i].neighbors++;                
                }
                if (myCell[i+columns-1].mainColor == myCell[0].colorOn){
                    myCell[i].neighbors++;                
                } 
                if (myCell[i+columns].mainColor == myCell[0].colorOn){
                    myCell[i].neighbors++;                
                }      
                if (myCell[i-columns].mainColor == myCell[0].colorOn){
                    myCell[i].neighbors++;                
                } 
                if (myCell[i-columns-1].mainColor == myCell[0].colorOn){
                    myCell[i].neighbors++;                
                }       
                if (myCell[i-columns+1].mainColor == myCell[0].colorOn){
                    myCell[i].neighbors++;                
                }                    
            }
            if (myCell[i].mainColor == myCell[0].colorOff && myCell[i].neighbors == 3){
                myCell[i].mainColor = myCell[0].colorOn;
                // myCell[i].mainColor = 'red';
                myCell[i].draw(); 
                myCell[i].neighbors = 0;
            }

            // if (myCell[i].mainColor == myCell[0].colorOn && myCell[i].neighbors > 3 || myCell[i].neighbors < 2){
            //     myCell[i].mainColor = myCell[0].colorOff;
            //     // myCell[i].draw(); 
            //     // myCell[i].neighbors = 0;
            // }

        myCell[i].draw();    
        // myCell[i].neighbors = 0;
    }
}
canvas.onmousedown = function(event){
    if (event.shiftKey) {
        console.log('зажали shift');
    }
    console.log(event.clientX, event.clientY);
    let mouseX = event.clientX - 10;
    let mouseY = event.clientY - 10;
    for (let i = 0; i < myCell.length; i++){
        if (mouseX >= myCell[i].x && mouseX <= myCell[i].x+myCell[i].size &&
            mouseY >= myCell[i].y && mouseY <= myCell[i].y+myCell[i].size){
            if (myCell[i].mainColor == myCell[i].colorOff){    
                myCell[i].mainColor = myCell[i].colorOn;
                myCell[i].draw();
            }else{
                myCell[i].mainColor = myCell[i].colorOff;
                myCell[i].draw();
            }
        }
    }
};