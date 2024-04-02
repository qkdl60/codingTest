const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,m,r],item,...L] = fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number));
/*
양방향
각 방향에시작 해당 거리까지 갈수 있는지 ? 
플루이트 와셜가능?
*/
const dist =Array.from({length:n}, ()=>Array(n).fill(Infinity));
for(let i = 0; i<n; i++){
    dist[i][i]=0;
}
for(let [f,t,d] of L){
    dist[f-1][t-1]=d;
    dist[t-1][f-1]=d;
}

for(let i =0; i<n; i++){
    // 중간
    for(let j=0; j<n; j++){
        for(let k=0; k<n; k++){
            dist[j][k]=Math.min(dist[j][i]+dist[i][k] , dist[j][k])
        }
    }
}

const posible=dist.map(i=>i.reduce((acc,cur,index)=> {
    if(cur<=m)acc.push(index)
    return acc;
}, []))
const counts=posible.map(i=>i.reduce((acc,cur)=>{
    acc+=item[cur]
    return acc
},0))
console.log(Math.max(...counts))