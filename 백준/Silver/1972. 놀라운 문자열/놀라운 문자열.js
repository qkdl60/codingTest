/*
1개만 있어도 유일쌍

*/
const fs =require('fs');
const filePath=process.platform==='linux'? '/dev/stdin':'./input.txt';
const str=fs.readFileSync(filePath).toString().trim().split("\n");
const isSurprising='is surprising.';
const isNotSurprising='is NOT surprising.';
const answer= [];
//4중 반복, 시간복잡도 가능?
for(let s of str){
    let uniqueFlag=true;
    for(let i= 0; i<=s.length-2; i++){
        const couples=[];
        //i는 간격, i 쌍
        for(let j =0; j<s.length-i-1; j++){
            //j는 s의 시작점 
            const a =s[j];
            const b=s[j+i+1]
           couples.push(a+b);
        }
        const couplesSet=new Set(couples);

        if(couplesSet.size!==couples.length)uniqueFlag=false;
        if(!uniqueFlag)break;
    }
    if(s==='*')continue;
    answer.push(`${s} ${uniqueFlag?isSurprising:isNotSurprising}`);
}
console.log(answer.join("\n"))