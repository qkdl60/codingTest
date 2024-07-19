let fs = require("fs");
let [N,...S] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n,m]=N.split(' ').map(Number);
const map=S.map(i=>i.split(' ').map(Number))

const d=[[1,0], [0,1], [-1, 0], [0,-1]];
const visited= Array.from({length:n}, ()=>Array.from({length:m}, ()=>0));
let startPosition;
for(let i =0; i<n; i++){
    let flag=false;
    for(let j=0; j<m; j++){
        const t= map[i][j];
        if( t===2){
            startPosition=[i,j]
            flag= true;
            break;
        }
    }
    if(flag)break;
}

const [sx,sy]=startPosition;
visited[sx][sy]=1;
let queue=[startPosition]
let count=0;
while(queue.length){
    count++;
    const replace=[];
    for(let [cx,cy] of queue){
        for(let [dx,dy] of d){
            const[nx,ny]=[cx+dx, cy+dy];
            if(nx>=0 && nx<n && ny>=0 && ny<m && map[nx][ny]===1 && visited[nx][ny]===0){
                visited[nx][ny]=count;
                replace.push([nx,ny])
            }
        }
    }
    queue=replace;
}
visited[sx][sy]=0;
for(let i=0; i<n; i++){
    for(let j=0; j<m; j++){
        if(map[i][j]===1 && visited[i][j]===0){
            visited[i][j]=-1;
        }
    }
}
console.log(visited.map(i=>i.join(' ')).join('\n'))


//0은 갈 수 없고, 1은 갈 수 있고, 2는 목표 지점 