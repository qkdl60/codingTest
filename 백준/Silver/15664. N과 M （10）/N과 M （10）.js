const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [s,l] = fs.readFileSync(filePath).toString().trim().split("\n")
const [n,m]= s.split(" ").map(Number);
const list=l.split(' ').map(Number).sort((a,b)=>a-b);

const result =[...new Set(getP(list, 0).map(i=> i.join(" ")))];

console.log(result.join('\n') )
function getP(list ,current){
    if(current===m-1)return list.map(i=>[i]);
    const result=[];
    for(let i=0; i<list.length ; i++){
        const a=list[i];
        const rest=list.slice(i+1) 
        const pre=getP(rest, current+1).map(i=> [a, ...i]);
        result.push(...pre);
    }
    
    return result ;
}