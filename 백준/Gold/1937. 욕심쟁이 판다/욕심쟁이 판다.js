/*
각 실행은 독립실행이라서 bfs 안되나?
각 실행이 독립되도록
각 위치가 최대로 갈 수 있는 걱리를 알고 있다면 좋을 텐데
앞으로 움직인 거리를 리턴받고 현재 움직임 갯수를 빼준다. 
visited는 위치에서 가장 많이 이동한 거리를 저장한다. 
최대이동거리를 저장하는 dp 도 필요하고, 다 먹은 위치에 대한 저장을 해줄 dp 도 필요하다. 
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n, ...map] = fs.readFileSync(filePath).toString().trim().split("\n");
n=Number(n);
map=map.map(i=>i.split(" ").map(Number));
let maxMoveCount=Number.MIN_SAFE_INTEGER;
const dirs=[[0,1], [1,0 ], [-1,0 ], [0,-1]];
const dp=Array.from({length:n }, ()=>Array.from({length:n }, ()=>0))

for(let i = 0 ;i < n ; i++){
    for(let j = 0; j< n ; j++){
        maxMoveCount= Math.max(dfs([i,j]), maxMoveCount);
    }
}
      
console.log(maxMoveCount)

function dfs(start){
    
    const [x,y]=start;
    if( dp[x][y])return dp[x][y]
    dp[x][y]=1;
    // 해당 위치에대한 최대 이동거리를 넘겨줘야한다. 
    for(let[dx,dy] of dirs){
        const nx=x+dx , ny=y+dy;
        if(nx>=0 && nx<n && ny>=0 && y<n && map[x][y]<map[nx][ny]){
            //아직 가본적 없다 dfs 진행이 필요
                const move=dfs([nx,ny])
                dp[x][y]=Math.max(dp[x][y], move+1);
                 maxMoveCount=Math.max(dp[x][y], maxMoveCount);
            // 진행이 된 곳이고 최대값이 들어잇다. 
          
        }
    }
    maxMoveCount=Math.max(dp[x][y], maxMoveCount);
    return  dp[x][y]// dp값을 반환 해준다. 
    
}
