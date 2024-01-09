/*
    [x,y]= x는 y의 부모
     {parent, child}
     굳이 부모,자식을 나누어야 하나? 나눠 줘야한다. 다시 
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n,t,m,...list] = fs.readFileSync(filePath).toString().trim().split("\n");
[n,m]=[n,m].map(Number);
const [t1,t2]=t.split(" ").map(Number);
const tree=Array.from({length:n+1},()=>[]);
list.forEach(i=>{
    const [x,y]=i.split(" ").map(Number);
    if(!tree[x].includes(y))tree[x].push(y);
    if(!tree[y].includes(x))tree[y].push(x);
})
const visited=[];
let answer=-1;
const dfs=(tree, from, to, count)=>{
    visited.push(from);
    if(tree[from].includes(to)){
        answer=count;
        return;
    }
    for(let next of tree[from]){
        if(!visited.includes(next))dfs(tree,next,to, count+1);
    }
}

dfs(tree,t1,t2,1);
console.log(answer)

