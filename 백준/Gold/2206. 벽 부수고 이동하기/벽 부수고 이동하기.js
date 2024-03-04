const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...L] = fs.readFileSync(filePath).toString().trim().split('\n');
const [n,m]=N.split(" ").map(Number);
const list= L.map(i=>i.split('').map(Number));
const visited=Array.from({length:n}, ()=>Array.from({length:m}, ()=>[0,0]))
const d=[[1,0],[-1,0], [0,1],[0,-1]];
let queue=[[0,0,0]]//x, y, isCanDrill
visited[0][0]=[1,0]
let count=1;
let breakFlag=false;
while(queue.length){
    count++;
    const replaced=[]
    for(const [x,y, isCan] of queue){
        if(x===n-1 && y ===m-1){
            breakFlag=true;
            break;
        }
        for(let i=0; i<4; i++){
            const [dx,dy]=d[i]
            const [nx,ny]=[dx+x, dy+y];
            // 만약 list[nx][ny]===1 이면 뚫
            if( nx>=0 && nx<n && ny>=0 &&ny<m){
                if(list[nx][ny]===0 
                   && visited[nx][ny][isCan] ===0)
                {
                    visited[nx][ny][isCan]=visited[x][y][isCan]+1;
                    replaced.push([nx,ny,isCan])
                }else if(list[nx][ny]===1 && isCan===0){
                    visited[nx][ny][1]=visited[x][y][isCan]+1;
                    replaced.push([nx,ny,1]);
                }
               
            }
        }
    }    
    if(breakFlag)break;
    queue=replaced;
}
const answer= visited[n-1][m-1];
console.log(answer[0]===0 && answer[1]===0? -1 :Math.max(...answer))
//1칸 무시를 어떻게?