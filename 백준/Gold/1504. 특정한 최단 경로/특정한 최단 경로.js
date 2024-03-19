const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,e],...list] = fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number));
const [v1,v2]=list.pop();
const dist =Array.from({length:n+1}, ()=>Array.from({length:n+1}, ()=>Infinity));
for(let i=0; i<=n; i++){
    dist[i][i]=0;
}
for( let [f,t,w] of list ){
    dist[f][t]=w;
    dist[t][f]=w;
}


for(let i = 0 ; i<=n; i++){
    for(let j=0; j<=n; j++){
        for(let k=0; k<=n; k++){
            dist[j][k]=Math.min(dist[j][k], dist[j][i]+dist[i][k]);
        }
    }
}


//두 정점에 대한 경우의 수는  1 v1 v2 n ,  1 v2 v1 n , 1 v1 1 v2 1 n , 1 v1 1 v2 n , 1 경우의 수 상과 없다 .어차피 경유하는 경우도 다 적용된다. 


const answer= Math.min(dist[1][v1]+dist[v1][v2]+ dist[v2][n], 
            dist[1][v2]+dist[v2][v1]+dist[v1][n] , 
    dist[1][v1]+dist[v1][v2]+dist[v2][v1]+dist[v1][n], 
        dist[1][v2]+dist[v2][v1]+dist[v1][v2]+dist[v2][n])
console.log(answer===Infinity ? -1 : answer)