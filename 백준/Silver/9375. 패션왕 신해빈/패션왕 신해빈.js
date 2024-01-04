const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n, ...c] = fs.readFileSync(filePath).toString().trim().split("\n");
let answer='';
for(let i=0; i<Number(n); i++){
    const count=c.shift();
    const rest=c.slice(count);
    
    const cloths=c.slice(0,count).reduce((acc,cur)=>{
        const [item, kind]=cur.split(" ");
        if(acc.hasOwnProperty(kind))acc[kind].push(item);
        else acc[kind]=[null,item];
        return acc;
    }, {});
    let result =1;
    for(let[key, value] of Object.entries(cloths)){
        const length=value.length;
        result*=length;
    }
    
    answer+=(result-1)+'\n';
    
    
    c=rest;
    
}

console.log( answer)