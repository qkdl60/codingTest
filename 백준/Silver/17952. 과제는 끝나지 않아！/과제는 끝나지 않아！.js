/*
n<=1000000으로 한번으 순회로 끝내야 한다. 
*/
const fs =require('fs');
const filePath=process.platform==='linux'? '/dev/stdin':'./input.txt';
const [N,...S]=fs.readFileSync(filePath).toString().trim().split("\n");
const n = Number(N);

let totalScore=0;
const currentIng=[];
for(let a of S){

    const [is, score, time]=a.split(" ").map(Number);
    if(is){
        currentIng.push([is, score, time-1]);
        
    }
    else{
        const c= currentIng[currentIng.length-1];
        if(c)c[2]--;
    }
    const ch=currentIng[currentIng.length-1];
    if(ch && ch[2]===0){
        totalScore+=ch[1];
        currentIng.pop();
    }
    
}

console.log(totalScore)