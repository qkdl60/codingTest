/*
최대한 긴 과자를 똑같이 나눠주려고 한다. 
과자는 여러 조각으로 나눌 수 있지만 합칠 수 없다. 

같은 길이의 과자를 못주면 0을 반환

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,L] = fs.readFileSync(filePath).toString().trim().split("\n")
const [m,n]=N.split(" ").map(Number);
const list=L.split(' ').map(Number);

let answer=0; 
let max=Math.max(...list);
let min=1;
while(min<=max){
    const mid = Math.floor((max+min)/2);
    //mid의 길이의 과자를 얼만큼 만들 수 있는지 체크
    const count =countSnaks(mid)

    //원하는 답은 과자의 최대길이 
   //길이대로 잘랐을 때의 과자 수가 같거나 많다면 더 길게 해줘야 한다. (같은때는 조건에 부합하지만 더 큰 경우도 찾기 위해)
    //이 과정에서 min은 해당 범위를 넘길 수 있고 max가 답이 된다 .
    if(count>=m){
        min=mid+1;
    }else{
        max=mid-1;
    }
    
}

console.log(max)


function countSnaks(long){
    let count=0;
    for(let a of list ){
       count+=Math.floor(a/long);
    }
    return count
}