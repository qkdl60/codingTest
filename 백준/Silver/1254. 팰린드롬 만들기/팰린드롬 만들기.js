const fs =require('fs');
const filePath=process.platform==='linux'? '/dev/stdin':'./input.txt';
const str= fs.readFileSync(filePath).toString().trim();

let postStr='';
let index=0;
while(!isP(str+postStr)){
    postStr=str[index]+postStr;
    index++;
}

console.log((str+postStr).length)





//짝, 홀 나누기 필요?
function isP(str){
    const halfLength=Math.floor(str.length/2);
    //길이가 5이면 2, 4이면 2, 
    for(let i =0; i<=halfLength; i++){
        const preChar=str[i];
        //0,1,2
        const postChar=str.at(-1-i);
        //-1,-2,-3
        if(preChar!==postChar)return false
    }
    
    return true;
}