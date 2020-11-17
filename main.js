let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.height = 800;
canvas.width = 800;
canvas.style = 'background:pink; border:1px solid black';
document.body.appendChild(canvas);

let timerId = 0;

let size = +document.getElementById("size").value;
let colorFull = document.getElementById("colorFull").value;
let colorEmpty = document.getElementById("colorEmpty").value;
let fps = 1000 / +document.getElementById("fps").value;
let interval = +document.getElementById("interval").value;
let start = document.getElementById("start");
let reStart = document.getElementById("reStart");
let rndButton = document.getElementById("rnd");
let strings = Math.round(canvas.height/(size+interval));
let columns = Math.round(canvas.width/(size+interval));
let rndMinCells = +document.getElementById("rndMinCells").value;


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
let life = [1];
for (let i = 0; i < 9; i++){
    if (life[i] == undefined){
        life[i]= life[0];
    }    
}

let dead = [0, 1, 2, 3, 4, 5, 6, 7, 8];
for (let i = 0; i < 9; i++){
    if (dead[i] == undefined){
        dead[i]= dead[0];
    }    
}
console.log(dead);

    for (let i = 0; i < myCell.length; i++){
        // в пустой клетке, рядом с которой ровно три живые клетки, зарождается жизнь
        if (myCell[i].mainColor == myCell[0].colorOff && 
            myCell[i].neighbors == life[0] ||
            myCell[i].neighbors == life[1] ||
            myCell[i].neighbors == life[2] ||
            myCell[i].neighbors == life[3] ||
            myCell[i].neighbors == life[4] ||
            myCell[i].neighbors == life[5] ||
            myCell[i].neighbors == life[6] ||
            myCell[i].neighbors == life[7] ||
            myCell[i].neighbors == life[8]){
            myCell[i].mainColor = myCell[0].colorOn;
        }
        // если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; 
        // в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»)
        if (myCell[i].mainColor == myCell[0].colorOn && 
            myCell[i].neighbors != dead[0] &&
            myCell[i].neighbors != dead[1] &&
            myCell[i].neighbors != dead[2] &&
            myCell[i].neighbors != dead[3] &&
            myCell[i].neighbors != dead[4] &&
            myCell[i].neighbors != dead[5] &&
            myCell[i].neighbors != dead[6] &&
            myCell[i].neighbors != dead[7] &&
            myCell[i].neighbors != dead[8]){
            myCell[i].mainColor = myCell[0].colorOff;
        }
        myCell[i].draw();    
        myCell[i].neighbors = 0;    
    }    
}
mainLoop();

reStart.onclick = function(){
    size = +document.getElementById("size").value;
    colorFull = document.getElementById("colorFull").value;
    colorEmpty = document.getElementById("colorEmpty").value;
    fps = 1000 / +document.getElementById("fps").value;
    interval = +document.getElementById("interval").value;    
    strings = Math.round(canvas.height/(size+interval));
    columns = Math.round(canvas.width/(size+interval));
    rndMinCells = +document.getElementById("rndMinCells").value;

    myCell = [];
    for (let i = 0; i < columns; i++){
        for (let j = 0; j < strings; j++){
        myCell.push(new Cell(j*(size+interval), i*(size+interval), size, interval, colorEmpty, colorFull));         
        }    
    }
    ctx.fillStyle = myCell[0].mainColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);  
    for (let i = 0; i < myCell.length; i++){
        myCell[i].draw();
    }    
};

start.onclick = function(){
    if (start.innerText == 'пуск'){
        timerId = setInterval(mainLoop, fps); 
        start.innerText = 'стоп';
    }else{
        clearInterval(timerId);
        start.innerText = 'пуск';
    }
};


rndButton.onclick = function(){
    rndMinCells = +document.getElementById("rndMinCells").value;
    for (let i = 0; i < myCell.length; i++){
        myCell[i].mainColor = myCell[0].colorOff;
        myCell[i].draw();
    } 
    let a = randomAgain(rndMinCells, myCell.length);    
    for (let i = 0; i < a.length; i++){
        myCell[a[i]].mainColor = myCell[0].colorOn;
        myCell[a[i]].draw(); 
    }    
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