/*
마지막 문자에서 단어 순서대로 순회 하면서 앵무새 문장을 검사한다. 

*/
const fs=require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [N,...S]=fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
const writenSentence=S.pop().split(' ');
const parrots=S.map(i=>[0, false,...i.split(' ')]);
let isFindAll=true;

for(let word of writenSentence){
    let isFind=false;
    for(let parrot of parrots){
        const [startIdx, isEnd, ...words]=parrot;
        if(!isEnd && words[startIdx]===word){
            const nextIdx=startIdx+1;
            parrot[0]=nextIdx;
            if(nextIdx===words.length)parrot[1]=true;
            isFind=true;
            break;
        }
        
    }
    if(!isFind){
        isFindAll=false;
        break;
    }
}

if(!parrots.every(i=>i[1]))isFindAll=false;
console.log(isFindAll?'Possible':"Impossible")