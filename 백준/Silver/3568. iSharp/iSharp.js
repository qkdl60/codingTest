/*
 여러 변수 정의 , 공통 변수형 변수이름추가변수형, 

*/
const fs = require('fs');
const filePath= process.platform==='linux'?'/dev/stdin':'./input.txt';
const [common, ...s] =fs.readFileSync(filePath).toString().trim().split(" ");

const answer= [];

//common+뒤에 변수형 변수이름
//뒤에 있는 변수형 뒤집어야한다.  변수형은 3가지 
const typeMap={'[': '[]', '*':'*', '&':'&', ']':''};
const types=Object.keys(typeMap);

for(let a of s){
    const splited=a.split("");
    const name=splited.filter(v=>!types.includes(v) && v!==',' && v!==';' ).join('');
    const post=splited.reduce((acc,cur)=>{
        if(cur==="]")return acc;
        acc.push(typeMap[cur])
        return acc;
    },[]).reverse().join('');
    answer.push(`${common}${post} ${name};\n`);
}
console.log(answer.join(''))
//예외사항 변수명이 한글자 보장아닌가?