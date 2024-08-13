const fs= require('fs');
const filePath= process.platform==='linux'? '/dev/stdin': './input.txt';
const [s,t ]=fs.readFileSync(filePath).toString().trim().split('\n');
let target =t.split("");
let answer =false;
/*
뒤에서가 "A", 앞에가 "B"인 경우

앞, 뒤 모두 'B'인 경우
뒤집고 뒤에 제거 

앞, 뒤 모두 'A'인 경우
뒤에만 제거 


*/
re(target);
console.log(answer?1:0)

function re(strArr){
    if(answer)return;
    if(strArr.length===s.length){
        const str=strArr.join('');
        if(str===s){
            answer=true;
            return;
        }
    }
    const a =strArr[0];
    const l=strArr.at(-1);
    if(a==='B' && l==='A'){
        re(strArr.slice(1).reverse())
        re(strArr.slice(0,strArr.length-1))
        return;
    }
    if(a==='B' ){
        re(strArr.slice(1).reverse())
        return;
    }
    if(l==="A"){
        re(strArr.slice(0,strArr.length-1))
        return;
    }
    
}