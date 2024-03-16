const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,M,...L] = fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
const m=Number(M);
const list =L.map(i=>i.split(" ").map(Number));
const dist =Array.from({length:n}, ()=>Array.from({length:n}, ()=>Infinity));
const graph=Array.from({length:n} ,()=>new Set());
for(let i =0; i<n; i++){
    dist[i][i]=0;
}

for(let [f, t, p] of list ){
    dist[f-1][t-1]=Math.min(dist[f-1][t-1], p);
    graph[f-1].add(t-1);
}
for(let i=0; i<n; i++){
    // 경유
    for(let j=0; j<n; j++){
        //출발
        for(let k=0; k<n; k++){
            // 도착
            if(dist[j][i]===Infinity || dist[i][k]===Infinity)continue //갈수 없는 경우
            dist[j][k]=Math.min(dist[j][k], dist[j][i]+dist[i][k]);
        }
    }
}
for(let i=0; i<n; i++){
    for(let j =0 ;j< n ;j++){
        if(dist[i][j]===Infinity)dist[i][j]=0;
    }
}
console.log(dist.map(i=>i.join(' ')).join('\n'))