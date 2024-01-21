/*

점수는 구간의 최대 - 최소 
모두 점수 중 최대값이 최소가 되도록 

하나 이상의 연속된 수=> 하나도 된다. 즉 최소 0, 최대  max-min
범위를 보면 BigInt는 필요 없다. 

입력 받은 배열을 m개 이하의 구간으로 나누어서 => 어떤식으로 구현?
m개이하의 구간으로 나눌 수 있는지 확인하는 방법은?

8 3

1 5 4 6 2 1 3 7 

left =0, right =7, mid = 3이 됩니다. 

solve로 들어가서 

1->5 :1과 5의 차이는 4이므로 구간을 나눠줘야 합니다. 따라서 1은 하나의 구간에 담기고 5부터 다시 탐색합니다. 

5 -> 4-> ->6 ->2: 가장 큰 수인 6과 가장 작은 수인 2의 차이가 4입니다. 따라서 5,4,6까지만 구간을 나누고 2부터 다시 탐색합니다. 

2->1->3->7: 가장 큰수인 7과 가장 작은 수인 1의 차이가 6입니다 따라서 2,1,3까지 담고 7부터 탐색합니다.


*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S,L]= fs.readFileSync(filePath).toString().trim().split("\n");
const [n,m]=S.split(" ").map(Number);
const list =L.split(" ").map(Number);
if(n===m || new Set(list).size===1){
    console.log(0);
    return; 
}

let left= 0 ;
let right =Math.max(...list);
while(left<=right){
const mid =Math.floor((left+right)/2);
const count=divide(mid);
  
  if( count>m){
    left=mid+1;
  }else{
      right=mid-1;
  }
}
console.log(left)
// 너무 많이 나눠진다.=> 값이 너무 낮다 
function divide(mid){
    let max=list[0];
    let min=list[0]
    let count=1;
    for(let i=1; i<n; i++){
        const a =list[i];
        max=Math.max(max, a);
        min=Math.min(min, a);
        
        if(max-min>mid){
            count++;
            max=list[i];
            min=list[i];
            i--;
        }
    }
    return count;
}