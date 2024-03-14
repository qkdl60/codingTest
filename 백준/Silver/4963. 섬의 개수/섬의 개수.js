const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let list = fs.readFileSync(filePath).toString().trim().split('\n'); 
const d= [[0,1],[0,-1],[1,0],[-1,0], [-1, -1], [1,-1], [-1,1],[1, 1]];
const answer=[];
while(list.length){
    const [w,h]=list.shift().split(" ").map(Number);
    const map=list.slice(0,h ).map(i=>i.split(" ").map(Number));
    list=list.slice(h);
    let iCount=0;
    for(let i=0; i<h; i++){
        for(let j=0; j<w; j++){
            if(map[i][j]===1){
                iCount++;
                map[i][j]=0;
                bfs(i,j,map);
                
            }
        }
    }

    answer.push(iCount);
    
}
answer.pop();
console.log( answer.join("\n"));

function bfs(i,j,map){

let queue=[[i,j]];
while(queue.length){
    const replace=[];
    for(let [x,y] of queue){
        for(let [dx, dy] of d){
            const [nx,ny]=[x+dx, y+dy];
            if(nx>=0 && nx<map.length && ny>=0 && ny<map[0].length && map[nx][ny]===1){
                map[nx][ny]=0;
                replace.push([nx,ny]);
            }
        }
    }
    queue=replace;
}
    
}