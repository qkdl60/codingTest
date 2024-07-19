/*

자기보다 큰 사람이 왼쪽에 몇 명 있었는지 기억=>
 인덱스는 키 순서이다. 
*/

const fs= require('fs');
const filePath=process.platform==='linux'? '/dev/stdin':'./input.txt';
const [[n],s]=fs.readFileSync(filePath).toString().split("\n").map(i=>i.split(' ').map(Number));
let people=[n];
for(let i =n-1; i>=1; i--){
    //i번째 사람의 왼쪽 수 temp;
    const temp=s[i-1];
    //people을 세면서 큰 사람 수를 count 할거다
    let count =0;
    for(let j =0 ; j<=people.length; j++){
        const a = people[j];
          if(count===temp){
            people.splice(j,0 ,i );
            break;    
        }
        if(a>i)count++;
        
      
        
    }
    
}
console.log(people.join(' '))