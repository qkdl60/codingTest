/*
빙산의 높이는 바닷물에 많이 접해있는 부분에서 더 빨리 줄어든다. 
네 방향으로 붙어있는 0이 저장돤 칸의 개수만큼 줄어든다. 
1년마다 녹이고, 덩어리 탐색

배열을 탐색 0이 아닌 것을 만나면 주변 탐색 0의 개수만큼 빼주고 새로운 배열에 넣어준다. 
배열을 탐색 주변에 0이 아닌 것들을 탐새
*/


const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, ...list] = fs.readFileSync(filePath).toString().trim().split('\n');
const [n,m]=N.split(" ").map(Number);
const visitedOrigin=Array.from({length:n}, ()=>Array.from({length:m}, ()=>0));
list = list.map(i=>i.split(" ").map(Number));
const XD=[0,1,0,-1];
const YD=[1,0,-1,0];
let years=0;
let keepFlag=true;
let splitFlag=false;
while(keepFlag){
    const ice=list.map(i=>[...i]);

    const visited=visitedOrigin.map(i=>[...i]);
    years++;
    for(let i =0 ; i<n; i++){
        for(let j=0; j<m; j++){
             const cur =list[i][j];
            if(cur!==0){
                let aroundIceCount=0;
                for(let k=0; k<4; k++){
                    // 테두리ㅣ 체크
                    const aroundX=i+XD[k];
                    const aroundY=j+YD[k];
                    if(aroundX>=0 && aroundY>=0 && aroundX<n&& aroundY<m && list[aroundX][aroundY]===0){
                        aroundIceCount++
                    }
                }
                ice[i][j]=ice[i][j]-aroundIceCount<0? 0:ice[i][j]-aroundIceCount
               
               
            }
            
        }
           
    }
    list=ice;
    //얼음 덩어리 탐색
    let iceMess=0;
    for(let i =0; i<n ; i++){
        for(let j =0 ; j< m ; j++){
            const cur =ice[i][j];
            if( cur!==0 && visited[i][j]===0){
                iceMess++;
                DFS([i,j], ice, visited);
            }
        }
    }

    if(iceMess===0 || iceMess>=2){
        keepFlag=false;
        splitFlag=iceMess>=2?true:false;
    }   
}
console.log(splitFlag?years:0)

function DFS(start,ice, visited,){
    const [x,y]=start;
    visited[x][y]=1; 
    for(let i =0; i< 4; i++ ){
        const [nextX, nextY]=[x+XD[i], y+YD[i]];
        if(nextX>=0 && nextY >=0 
           && nextX<n && nextY<m 
           &&ice[nextX][nextY]!==0 
           && visited[nextX][nextY]===0)DFS([nextX,nextY], ice,visited);      
     }
    
}