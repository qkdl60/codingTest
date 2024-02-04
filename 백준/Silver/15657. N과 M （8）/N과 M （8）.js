const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [s,l] = fs.readFileSync(filePath).toString().trim().split("\n")
const [n,m]= s.split(" ").map(Number);
const list=l.split(' ').map(Number).sort((a,b)=>a-b);

const result = getP(list, 0);
console.log(result.map(i=>i.join(' ')).join('\n') )
function getP(list ,current){
    if(current===m-1)return list.map(i=>[i]);
    const result=[];
    for(let i=0; i<list.length ; i++){
        const a=list[i];
        const rest=list.slice(i) 
        const pre=getP(rest, current+1).map(i=> [a, ...i]);
        result.push(...pre);
    }
    
    return result ;
}