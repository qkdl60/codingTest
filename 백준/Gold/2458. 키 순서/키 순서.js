const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, m], ...list] = fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(" ").map(Number));
// const dist =Array.from({length: n}, ()=>Array.from({length:n}, ()=>Infinity));
// for(let i=0; i<n; i++ ){
//     dist[i][i]=0;
// }

// for(let [a,b] of list ){
//     dist[a-1][b-1]=-1; // a는 b 보다 작다  
//     dist[b-1][a-1]=1; // b는 a 보다 크다
// }
// for(let i = 0; i<n; i++){
//     for(let j= 0; j<n ; j++){
//         for(let k=0; k<n;k++){
//             //j i 가  
            
//             if(dist[j][i]===1 && dist [i][k]===1){
//                 dist[j][k]=1; 
//                 dist[k][j]=-1;
//             }
//             if(dist[j][i] ===-1 && dist[i][k]===-1){
//                 dist[j][k]=-1
//                 dist[k][j]=1;
//             }

                
            
//         }
//     }
// }
// console.log( dist.map(i=>i.filter(j=>j!==Infinity)).filter(i=>i.length===n).length )
// 플로이드 와셜 말고 다를 방법, bfs dfs 로 가능할 것이 다 
// 나보다 작은 사람 수 + 나보다 큰사람 수 = n-1 이다. 위치를 안다 .
const taller=Array.from ({length:n }, ()=>new Set());
const smaller=Array.from ({length:n }, ()=>new Set());
for(let [a,b] of list ){ // b가 더 크다
     taller[a-1].add(b-1); //이지 b 보다 더 큰 사람들도 taller[a] 에 넣어준다. 
        smaller[b-1].add(a-1); 
}

let count =0
for(let i = 0; i<n; i++){
    const visited= Array(n).fill(false);
    visited[i]=true;
    dfs(i,i, taller, [...visited]);
    dfs(i,i, smaller, [...visited]);

    if( taller[i].size +smaller[i].size === n-1 )count++
    
    
}

console.log(count)

function dfs(n, s,list, visited ){
    const moreList=list[s];
    for(let a of moreList ){
        if(visited[a]===false){
            list[n].add(a);
            visited[a]=true;
            dfs(n,a,list, visited);
        }
    }
    
}
