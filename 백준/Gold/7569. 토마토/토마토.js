/*
인접한 곳은 위, 아래, 왼쪽, 오른쪽, 앞, 뒤, 
m,n,h
3차원 배열 필요 
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S, ...L] = fs.readFileSync(filePath).toString().trim().split("\n")
const [m,n,h]=S.split(" ").map(Number);
const list=[]
for(let i= 0; i<h; i++){
    list.push(L.slice(i*n,(i*n)+n).map(i=>i.split(' ').map(Number)))
}



const d= [[ 0, 1,0], [0, -1, 0 ], [0,0,1], [0,0,-1], [1,0,0], [-1,0,0]];

let queue=[]
for(let i = 0; i<h; i++){
    for(let j=0; j<n; j++){
        for(let k=0; k<m; k++){
            if(list[i][j][k] === 1)queue.push([i,j,k]);
        }
    }
}

let count =0;
while(queue.length){
    const replaced=[];
   
    for(let [z,x,y] of queue){
        for(let l=0; l<6; l++){
            const [dz,dx,dy]=d[l];
            const [nz,nx,ny]=[z+dz,x+dx, y+dy]
            if(nz>=0 &&nz<h && nx>=0 &&  nx<n && ny>=0 && ny<m && list[nz][nx][ny]===0){
                list[nz][nx][ny]=1;
                replaced.push([nz,nx,ny]);
            }
        }
    }
    if(replaced.length)count++
    queue=replaced;
}

for(let i = 0; i<h; i++){
    for(let j=0; j<n; j++){
        for(let k=0; k<m; k++){
            if(list[i][j][k] === 0){
                console.log(-1);
                return;
            }
        }
    }
}
console.log(count)