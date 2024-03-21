const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n, m], ...list] = fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(" ").map(Number));
const dist =Array.from({length: n}, ()=>Array.from({length:n}, ()=>Infinity));
for(let i=0; i<n; i++ ){
    dist[i][i]=0;
}

for(let [a,b] of list ){
    dist[a-1][b-1]=-1; // a는 b 보다 작다  
    dist[b-1][a-1]=1; // b는 a 보다 크다
}
for(let i = 0; i<n; i++){
    for(let j= 0; j<n ; j++){
        for(let k=0; k<n;k++){
            //j i 가  
            
            if(dist[j][i]===1 && dist [i][k]===1){
                dist[j][k]=1; 
                dist[k][j]=-1;
            }
            if(dist[j][i] ===-1 && dist[i][k]===-1){
                dist[j][k]=-1
                dist[k][j]=1;
            }

                
            
        }
    }
}
console.log( dist.map(i=>i.filter(j=>j!==Infinity)).filter(i=>i.length===n).length )