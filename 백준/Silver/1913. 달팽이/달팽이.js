const fs = require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [n, k]=fs.readFileSync(filePath).toString().trim().split("\n").map(Number);

/*
width 와 height 모두 n 이된다. 

*/
const ar=Array.from({length:n}, ()=>Array.from({length:n}, ()=>false));

let current=[0, 0];
let currentCount= n*n; 
ar[current[0]][current[1]]=currentCount;
const result =[]
if(currentCount===k)result.push(1,1)

currentCount--;

const d=[[1,0], [0,1], [-1,0], [0,-1]];
let currentD=0;

while(currentCount>0){
    const [cx,cy]=current;
    const [dx,dy]=d[currentD];
    const [nx,ny]=[cx+dx, cy+dy];
    //턴을 언제 해주지? 
    if(nx>=0 && nx<n && ny>=0 && ny<n && ar[nx][ny]===false){
            if( currentCount===k){
                result.push(nx+1,ny+1)
            }
           
            ar[nx][ny]=currentCount;
            currentCount--;
            current=[nx,ny];
            
    }else{
        currentD++;
        if(currentD>3)currentD=0;
        continue;
    }
}

console.log( ar.map(i=>i.join(' ')).join('\n')+'\n'+result.join(' '))