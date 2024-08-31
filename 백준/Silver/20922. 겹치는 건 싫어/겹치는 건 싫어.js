const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [[n,k], list]= fs.readFileSync(filePath).toString().split("\n").map(i=>i.split(' ').map(Number));


const dp= Array(n).fill(1);
/*
 최장 연속 부분 수열 => 증가 수열x
연속 부분 수열 => 이어져 있어야 한다. 

1, 2, 3, 4, 5, 6, 7, 4, 8 


투포인터, 윈도우

count가 k 초과 되면 left ++ ;
나머지 right ++ ;

초과 여부 검사 , 초과시 등록하고 left 증가로 검사 

*/
const count= {};
let left =0; 
let right=0; 
let max =0
while(left <= right && right < n){
    const a= list[right];
    
    count[a]= count[a]?count[a]+1:1;
    while(count[a]>k){
        const b= list[left];
        count[b]--;
        left++;
    }
   
    max= Math.max(max, right-left+1)
    right++
}
console.log(max)