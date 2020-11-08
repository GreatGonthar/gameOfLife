let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.height = 800;
canvas.width = 800;
canvas.style = 'background:pink; border:1px solid black';
document.body.appendChild(canvas);


let size = +document.getElementById("size").value;
let colorFull = document.getElementById("colorFull").value;
let colorEmpty = document.getElementById("colorEmpty").value;
let fps = 1000 / +document.getElementById("fps").value;
let interval = +document.getElementById("interval").value;
let start = document.getElementById("start");
let rndButton = document.getElementById("rnd");
let strings = Math.round(canvas.height/(size+interval));
let columns = Math.round(canvas.width/(size+interval));
let min = +document.getElementById("rndMin").value;
let max = +document.getElementById("rndMax").value;

function rand(min, max) { 
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  }
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
        myCell.push(new Cell(j*(size+interval), i*(size+interval), size, interval, colorEmpty, colorFull));         
    }    
}

function mainLoop(){        
    for (let i = 0; i < myCell.length; i++){
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
    }

    for (let i = 0; i < myCell.length; i++){
        // в пустой клетке, рядом с которой ровно три живые клетки, зарождается жизнь
        if (myCell[i].mainColor == myCell[0].colorOff && myCell[i].neighbors == 3){
            myCell[i].mainColor = myCell[0].colorOn;
        }
        // если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; 
        // в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»)
        if (myCell[i].mainColor == myCell[0].colorOn && myCell[i].neighbors < 2 || myCell[i].neighbors > 3){
            myCell[i].mainColor = myCell[0].colorOff;
        }
        myCell[i].draw();    
        myCell[i].neighbors = 0;    
    }    
}
mainLoop();

start.onclick = function(){
    setInterval(mainLoop, fps);   
};
// TODO: реализовать случайные числа
rndButton.onclick = function(){
    let a = rand(0, myCell.length);    
    console.log('TODO: реализовать случайные числа', a);
};

canvas.onmousedown = function(event){
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