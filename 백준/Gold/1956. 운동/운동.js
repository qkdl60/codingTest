const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,m], ...list] = fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(' ').map(Number))
/*
일방통행 도록이다. 
*/
const dist =Array.from({length:n}, ()=>Array.from({length:n}, ()=>Infinity));


for(let [f,t ,w] of list ){
    dist[f-1][t-1]=Math.min(dist[f-1][t-1] , w)
}

for(let i =0 ; i<n ;i ++){
    for(let j =0; j< n; j++){
        for(let k=0; k<n; k++){
            dist[j][k]=Math.min(dist[j][k] , dist[i][k]+dist[j][i]);
        }
    }
}
let result=Number.MAX_SAFE_INTEGER;
for(let i =0; i< n; i++ ){
    result=Math.min( result, dist[i][i]);
}
console.log(result===Number.MAX_SAFE_INTEGER? -1 : result )