const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
let [n, ...list]=fs.readFileSync(filePath).toString().trim().split("\n").map(Number);
const maped=Array.from({length:n+1}, (_)=>null);
list.forEach((v, idx)=>{maped[idx+1]=v});


let q=[...new Set(list)]
while(true){
    let replace=new Set();
    for(let a of q){
        const value= maped[a];
        if(!replace.has(value))replace.add(value);
    }
    if(q.length === replace.size)break;
    q=[...replace];
}
console.log(`${q.length}\n${q.sort((a,b)=>a-b).join('\n')}`)



