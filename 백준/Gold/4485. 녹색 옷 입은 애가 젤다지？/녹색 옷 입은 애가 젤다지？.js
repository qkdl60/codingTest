
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let  list = fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number))

/*
bfs로만으로는 못 푸나?

*/

const d=[[1,0], [-1, 0 ], [0,1], [0,-1]];
const results=[];
while(list.length!==0){
    const n = list.shift().pop();
    if(n===0)break;
    const map =list.slice(0, n);
     list=list.slice(n);
    const visited=Array.from({length:n}, ()=>Array.from({length:n}, ()=>Infinity));

    visited[0][0]=map[0][0];
    let queue=[[0,0]];
    while(queue.length){
       const replaced=[];
        for(const [x,y ] of queue){
            const current=visited[x][y];
            for(const [dx,dy] of d){
                const [nx,ny]=[x+dx, y+dy];
                if( nx>=0 && nx<n && ny>=0 && ny<n ){
                    const next=map[nx][ny];
                    if(visited[nx][ny]>next+current){
                        visited[nx][ny]=next+current
                        replaced.push([nx,ny])
                        
                    }
                }
            }
        }
        queue=replaced;
    }
    results.push(visited[n-1][n-1])
    
}
console.log(results.map((i,index)=> `Problem ${index+1}: ${i}`).join("\n"))