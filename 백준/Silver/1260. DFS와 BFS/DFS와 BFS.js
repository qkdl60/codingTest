
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, ...l] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n,m,v]=N.split(" ").map(Number)
let g=Array.from({length:n+1}, ()=>[]);
for(let a of l){
    const [f,t]=a.split(" ").map(Number);
    g[f].push(t);
    g[t].push(f);
}
g.forEach(v=>v.sort((a,b)=>a-b));

const visited=Array.from({length:n+1}, ()=>0);
function initVisited(){
    visited.fill(0);
}

const answer1=[]
function DFS(s){
    visited[s]=1;
     answer1.push(s);
    for(let a of g[s] ){
        if(visited[a]===0){
           
            DFS(a);
        }
    }
}

const answer2=[];
function BFS(s){
    // BFS는 재귀를 사용하지 않는다. 
    visited[s]=1;
    let preAr=[s];
    while(preAr.length){
        const nextAr=[];
        for(let a of preAr){
            answer2.push(a)
            for(let b of g[a]){
                if(visited[b]===0){
                    visited[b]=1;
                     nextAr.push(b)
                }
            }
        }
        preAr=nextAr;
        
    }
}
DFS(v)
initVisited();
BFS(v);
console.log(answer1.join(' ')+'\n'+answer2.join(' '))
