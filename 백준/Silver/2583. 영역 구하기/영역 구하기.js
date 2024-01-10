/*
한 줄에 하나씩 직사각형
왼쪽아래 꼭지점, 오른쪽 위 꼭지점 차례로 주어진다. 
모눈종이의 왼쪽아래는 0,0 이다. 오른쪽 위 꼭짓저 n,m 

그냥 뒤집어서 진행=> 왼쪽 상단 0,0 , 오른쪽 아래 꼭짓점 n,m;

배열은 각 셀의 위치이고 , 이 문제에서 표현은 사각형의 꼭지점이다. 

각 사각형을 표시를 해준다. 그 후 bfs, dfs 진행
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,...list] = fs.readFileSync(filePath).toString().trim().split("\n");
const [m,n,k]=N.split(' ').map(Number);
const map=Array.from({length:m}, ()=>Array.from({length:n}, ()=>true));
//굳이 visited 가 필요한가? 그냥 map에서 진행?

const dirs=[[0,1], [0,-1], [1,0], [-1, 0]];
list.forEach(i=>{
    const [x1,y1,x2,y2]=i.split(" ").map(Number);
    for(let i=y1; i<y2; i++){
        for(let j=x1; j<x2; j++){
            map[i][j]=false;
        }
    }
})

let areaCount=0;
const areas=[];

for(let i =0 ; i<m; i++){
    for(let j =0 ; j< n ;j++){
        if(map[i][j] ){
            areas[areaCount]=1;
            map[i][j]=false
            bfs([i,j], map, areaCount);
            areaCount++;
        }
    }
}

console.log(areaCount+'\n'+areas.sort((a,b)=>a-b).join(" "))
function bfs(start, map, areaCount){
    let queue=[start];
    while(queue.length){
        const replaceQueue=[];
        for(let cur of queue){
            const [x,y]=cur;
           
            for(let i =0 ; i<4; i++){
            const [dx,dy]=dirs[i];
            const [nx,ny]=[x+dx, y+dy];
            if(nx>=0 && nx<m && ny>=0 && ny<n && map[nx][ny]  ){
                areas[areaCount]++;
                map[nx][ny]=false;
                replaceQueue.push([nx,ny])
        }
    }
            
        }
        queue=replaceQueue;
    }
    
}
