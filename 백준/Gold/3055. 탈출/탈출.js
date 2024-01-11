
/*
. 비어있는 곳
* 물이 차있는 곳
x 돌이 있는 곳
D 비버의 굴
S 고슴도치의 위치
가장 빠른 시간 => 가장짧은

각 방문시 이전 방문의 +1을하고 이전에 지나갔다면 시간을 비교해본다. 

각 타임에 해당하는 진행된 상태를 저장하는 배열과 ,이것을 표시해놓는 배열도 저장해둔다.  
각 타임을 진행하면선 각 타임 물 위치를 확인하고 
갈 수 있는지 체크한다. 
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n, ...map]= fs.readFileSync(filePath).toString().trim().split("\n")
const [r,c]=n.split(" ").map(Number)
map=map.map(i=>i.split(""))
const impossible='KAKTUS'
let goal;
let start;
const water=[[]];
const dirs=[[0,1], [1,0], [-1,0], [0,-1]];

// 각 표시 초기화
map.forEach((i,x)=>{
    i.forEach((j, y)=>{
        if(j==='S')start=[x,y];
        if(j==="D")goal=[x,y];
        if(j==="*")water[0].push([x,y]);
    })
})
//물의 진행도를 저장할 지도
const waterMap=map.map(i=>[...i]);
//dp밑 반복을 진행할 지도 
const visited=Array.from({length:r}, ()=>Array.from({length:c}, ()=>0))
//bfs 진행한다. 우선 물을 채우고 고스므도치가 가는길을 진행한다. 
let queue=[start];
let time=1; 
while(true){
   // 물이 찬다. 
    const nextWater=[];
    for(const a of water[time-1]){
        const [x,y]=a; 
        for(const [dx,dy] of dirs){
            const [nx,ny]=[x+dx, y+dy];
            // 지도 크기 검사, 물에서 '.'인 것
            if(nx>=0 && ny>=0 && nx<r&& ny<c && waterMap[nx][ny] ==='.'){
                waterMap[nx][ny]='*';
                nextWater.push([nx,ny]);
            }
        }
        
    }
    water[time]=nextWater
    // 고슴도치 움직인다. 
     const replaceQ=[];
    for(const [x,y] of queue){
        for(const [dx, dy] of dirs){
            const [nx, ny]=[dx+x, dy+y];
            //지도 크기 검사, 물인지 검사,  방문횟수 비교, 목표 체크 
            if(nx>=0 && nx<r && ny>=0 &&  ny<c && (waterMap[nx][ny]==='.'|| waterMap[nx][ny]==="D")){
                if(visited[nx][ny]===0){
                    visited[nx][ny]=time;
                    replaceQ.push([nx,ny]);
                }
                if(waterMap[nx][ny]==="D"){
                    console.log(time)
                    return;
                }
            }
        }
    }
    queue=replaceQ;
    time++;
    if(queue.length===0)break;
}
console.log(impossible);







