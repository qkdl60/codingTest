/*
0===".", 1==='#'
길이는 5의 배수
전체 길이를 5로나눈다 

각 숫자를 하나씩 나누고 해당하는 코드를 map을 통해서 디코딩한다 
어떻게 숫자를 분리하지? 숫자가 아닌 부분은 한 라인이 lines[n][a]이 '.'이다.
라인에 '#'가 있다면 입력하고 없다면 입력x
*/
const fs = require('fs');
const filePath=process.platform==='linux'?'/dev/stdin': './input.txt';
let [N,s]= fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
const lineLength=n/5;
const lines= [];
for(let i=1; i<=5; i++){
     const a =s.slice(0,lineLength);
    s=s.slice(lineLength);
    lines.push(a)
}
const blank='.....';
const numberMap={
    '######...######':0, 
    '#####':1, 
    '#.####.#.####.#':2, 
    '#.#.##.#.######':3,
    '###....#..#####':4,
    '###.##.#.##.###':5,
    '######.#.##.###':6,
    '#....#....#####':7,
    '######.#.######':8,
    '###.##.#.######':9
};

let code=''
const answer=[];

for(let i =0; i<lineLength; i++){
    const columnStr=getColumnString(i);

    if(columnStr===blank && code==='')continue;
    if(columnStr===blank && code!==''){
        const a=numberMap[code];
        answer.push(a);
        code='';
        continue;
    }
    if(i===lineLength-1 ){
        if(columnStr!==blank)code+=columnStr;
        const a= numberMap[code];
        answer.push(a);
        conde='';
        continue;
    }
    if(columnStr!==blank){
        code+=columnStr;
        continue;
    }
}
console.log(answer.join(''))
function getColumnString(line){
    let answer='';
    for(let i =0; i<5; i++){
        const a=lines[i][line];
        answer+=a;
    }
    return answer;
}


