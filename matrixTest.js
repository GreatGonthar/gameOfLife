let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let cellSize = 2;
let height = 500;
let width = 500;
let randomCells = 20000;
let color = 'red'

canvas.height = height * cellSize;
canvas.width = width * cellSize;
canvas.style = 'background:pink; border:1px solid black';

class Cells {
    constructor(size, columns, rows){
        this.size = size;
        this.columns = columns;
        this.rows = rows;
        this.cellsArr = [];    
    
        for (let y = 0; y < this.rows; y++){
            let rowArr = [];
            for (let x = 0; x < this.columns; x++){
                rowArr.push(false);
            }
            this.cellsArr.push(rowArr);
        }


        let temporaryArr = [];
        for (let y = 0; y < this.rows; y++){            
            for (let x = 0; x < this.columns; x++){
                temporaryArr.push({y, x});
            }
        } 
        for (let i = 0; i < randomCells; i++){
            let rnd = Math.floor(Math.random() * temporaryArr.length);            
            let element = temporaryArr.splice(rnd, 1)[0];
            this.cellsArr[element.y][element.x] = true;
        }
    }

    lifeOrDie(){
        let deadArr = [];
        let leaveArr = [];
        for (let y = 0; y < this.rows; y++){            
            for (let x = 0; x < this.columns; x++){    
                
                let neighbors = 0;
                for (let dx = -1; dx <= 1; dx++){
                    for (let dy = -1; dy <= 1; dy++){
                        if (dx == 0 && dy == 0){
                            continue;
                        }
                        if (x+dx <= 0 || x+dx >= this.columns){
                            continue;
                        }
                        if (y+dy <= 0 || y+dy >= this.rows){
                            continue;
                        }
                        else if (this.cellsArr[y+dy][x+dx] == true){
                            neighbors++;  
                        }
                    }
                }
                if (this.cellsArr[y][x] == true){
                    if (neighbors < 2 || neighbors > 3){
                        // this.cellsArr[y][x] = false;
                        deadArr.push({y, x});
                        // console.log(neighbors)
                    }
                    // console.log(neighbors);
                } else {
                    if (neighbors == 3){
                        // console.log(neighbors)
                        // this.cellsArr[y][x] = true;
                        leaveArr.push({y, x});
                    }
                }               
            }
        } 
        for (let i = 0; i < deadArr.length; i++){
            this.cellsArr[deadArr[i].y][deadArr[i].x] = false;
        }    
        for (let i = 0; i < leaveArr.length; i++){
            this.cellsArr[leaveArr[i].y][leaveArr[i].x] = true;
        }      
    }
}
let myCells = new Cells(cellSize, width, height);

function draw(myObject){
    for (let y = 0; y < myObject.rows; y++){            
        for (let x = 0; x < myObject.columns; x++){
            if (myObject.cellsArr[y][x] == true){
                ctx.fillStyle = color;
                ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);  
            }
        }
    } 
}

requestAnimationFrame(tick);
// setInterval(tick, 100); 

function tick(){
    ctx.fillStyle = 'silver';
    ctx.fillRect(0, 0, canvas.width, canvas.height);     
    myCells.lifeOrDie();
    draw(myCells);
    requestAnimationFrame(tick);

}