const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...L] = fs.readFileSync(filePath).toString().trim().split('\n')
const n=Number(N);
const list =L.map(i=>i.split(" ").map(Number))
const graph=Array.from({length:n}, ()=>[]);
for(let i=0; i< n ; i++){
    for(let j=0; j< n ;j++){
        if(list[i][j]===1)graph[i].push(j);
    }
}
const g=Array.from({length:n+1}, ()=>[])
for(let i =0; i < n; i++){
    const visited=Array.from({length:n+1}, ()=>0)
    let queue=[...graph[i]];
    while(queue.length){
        let replace=[];
        for(let a of queue){
            if(visited[a]===0){
                replace.push(...graph[a]);
                g[i].push(a)
                visited[a]=1;
                
            }
        }

    queue=replace
    }
}
const answer=Array.from ({length:n}, ()=>Array.from({length:n}, ()=>0));
for(let i=0; i<n ; i++){
    for(let a of g[i]){
        answer[i][a]=1;
    }
}
console.log(answer.map(i=>i.join(" ")).join('\n'))