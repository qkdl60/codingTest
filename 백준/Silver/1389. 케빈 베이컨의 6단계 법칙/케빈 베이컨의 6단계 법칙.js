const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,m],...list]= fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number))

const dist =Array.from({length:n}, ()=>Array.from({length:n}, ()=>Infinity));
for(let i = 0; i<n; i++){
    dist[i][i]=0;
}
for(let [a,b] of list ){
    dist[a-1][b-1]=1;
    dist[b-1][a-1]=1;
}


for(let i =0; i<n; i++){
    for(let j=0; j<n; j++ ){
        for(let k=0; k<n; k++){
            dist[j][k]=Math.min(dist[j][k], dist[j][i]+dist[i][k]);
        }
    }
}
const sums=dist.map(i=> i.reduce((acc,cur)=>acc+cur, 0))
const min =Math.min(...sums) ;
console.log(sums.indexOf(min)+1)