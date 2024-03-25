const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,m,x] ,...list]= fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(' ').map(Number));


const dist =Array.from({length:n+1}, ()=>Array.from({length:n+1}, ()=>Infinity));
for(const [f,t,w] of list ){
    dist[f][t]=w;
}
for(let i =0 ; i<=n; i++){
    dist[i][i]=0;
}
for(let i= 1; i<=n; i++){
    for(let j=1; j<=n; j++){
        for(let k=1; k<=n; k++){
            dist[j][k]=Math.min(dist[j][k], dist[j][i]+dist[i][k]);
        }
    }
}
let max=Number.MIN_SAFE_INTEGER;
for(let i = 1; i<=n; i++){
   max=Math.max(max,  dist[i][x]+dist[x][i]);
}

console.log( max)