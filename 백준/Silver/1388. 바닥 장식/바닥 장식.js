const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S,...L] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n,m]=S.split(" ").map(Number);
const board=L.map(i=>i.split(""))
let count =0;
const visited=Array.from({length:n}, ()=>Array.from({length:n}, ()=>false))

const d={'-': [0,1], '|': [1,0]}

for(let i =0 ; i< n ; i++){
    for(let j= 0 ; j< m; j++){
        if(!visited[i][j]){
           
            const a = board[i][j];
            count++;
            dfs([i,j], a)
            
        }
    }
}
console.log(count)

function dfs(start, t ){
    const [x,y]=start;
    visited[x][y]=true;
    const a=board[x][y];
    const [dx,dy]=d[t];
    const [nx,ny]=[x+dx, y+dy];
   if(nx>=0 && nx<n && ny>=0 && ny<m && !visited[nx][ny] && board[nx][ny]===t){
       dfs([nx,ny], t)
   }
        

}