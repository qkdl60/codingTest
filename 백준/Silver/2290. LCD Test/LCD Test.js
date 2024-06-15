const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const[S, n]=fs.readFileSync(filePath).toString().trim().split(" ");
const s= Number(S)


/*
숫자는 구성요소 - , |  ,   |, | | ,  
뚜껑' '+' '-' * s + ' '
상단 '|' * s
중심은 공백 , ' '+'-'*s+' '  만큼
하단 '|'*s
바닥 ' '+'-' *s + ' ' 
*/
const numberMap={
    0:['row','column', 'space', 'column', 'row'], 
    1:['space','columnR', 'space','columnR','space'],
    2:["row", 'columnR', "row", 'columnL', 'row'],
    3:['row', 'columnR', 'row', 'columnR','row'],
    4: ['space', 'column', 'row', 'columnR', 'space'],
    5:['row', 'columnL', 'row', 'columnR','row'],
    6:['row', 'columnL', 'row', 'column', 'row'],
    7:['row', 'columnR', 'space', 'columnR','space'],
    8:['row','column', 'row', 'column', 'row'],
    9:['row', 'column', 'row', 'columnR','row']
}

const row= ' '+'-'.repeat(s)+' ';
const space=' '.repeat(s+2);
const columnR=' '.repeat(s+1)+'|';
const columnL='|'+' '.repeat(s+1);
const column='|'+' '.repeat(s)+'|';
const partMap={row, space, columnR, columnL, column}
const parts= [0,1,2,3,4];
const numbers= n.split('')
let answer=[];

for( const p of parts){
    let result='';
    for(let a of numbers){
        const part=numberMap[a][p]
        const b=partMap[part]
        result+=b+' ';
    }
    result+='\n';
    answer.push(result);
    if(p===1 || p===3){
        for(let i=0 ; i<s-1;i++){
            answer.push(result);
        }
    }
    
    
//1,3 은 위 줄을복사해서 밑추가해줘야한다.  
}
console.log(answer.join(''))
