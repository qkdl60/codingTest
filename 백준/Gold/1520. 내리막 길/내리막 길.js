/*
중복이 가능하네
동시에 진행하는 bfs 보다는 중복방지를 위해서 dfs 가 더편하것 같다. 
메모리 초과로 visited는 빼준다.=> 어차피 내리막으로만 가서 중복되는 곳으로는 못 간다.
이전에 뚫었던 길이면 굳이 끝까지 안가도 된다. 카운트만 올려준다. 
골 지점에 도착한 케이스만 visited에 반영해줘야한다. 
중간 경로의 visited가 true일때 단순히 가지수를 +1해주면  
이 중간경로를 지나서 나오는 다른 경우의 수를 찾지못한다. 

그렇다면 각 칸에서 갈 수 있는 경우의 수를 가지고 있어야된다. 

visited가 없다면 => 메모리초과 , visited 백트래킹=> 경우의 수 모두 탐색이 불가 

지금 답은 맞다. 시간초과를 최적화가 필요하다. 현재 이동했던 구간을 배열에 넣고 
마지막에 반복문으로 넣어주고 있는데 이 방식은 시간이 초과된다. 진행하는 구건에 대해서 바로 바로 
넣어주어야한다. 

return 방식으로 visited에 들어갈 값을 -1이 아닌 곳을 만날때까지 할당을 유보시킬수 있다. 


*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,...list] = fs.readFileSync(filePath).toString().trim().split('\n');
const [n,m]=N.split(" ").map(Number);
const dirs=[[0,1],[1,0],[0,-1],[-1,0]];

const map =list.map(i=>i.split(' ').map(Number));
const visited=Array.from({length:n}, ()=>Array.from({length:m}, ()=>-1));
visited[n-1][m-1]=1;

function dfs(start, map,curHeight){
    const [x,y]=start;
    if(visited[x][y]!==-1)return visited[x][y];
    
    visited[x][y]=0;
    
    for(const [dx, dy] of dirs){
        const [nx,ny]=[x+dx, y+dy];
        if(nx>=0 && ny>= 0 && nx<n && ny<m && curHeight>map[nx][ny] ){
            visited[x][y]+=dfs([nx,ny],map, map[nx][ny])
        }
    }
    return visited[x][y]
}
const answer = dfs([0,0], map,map[0][0])

console.log(answer)
