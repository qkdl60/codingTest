/*
질투심 수치화 = 가장 많은 보석을 가져간 학생이 가지고 있는 보석의 개수 , 질투심을 최소화 
학생은 항상 같은 색의 보석만 가져간다. 
보석을 못가지는 아이가 있어도 된다. 하지만 
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const[S,...L]= fs.readFileSync(filePath).toString().trim().split('\n');
const [n,m]=S.split(" ").map(Number);
const list =L.map(Number);

let left= 1 ;
let right=Math.max(...list);
while(left<=right){
const mid=Math.floor((left+right)/2);
const needPeople=list.reduce((acc,cur)=>{
 const a=   Math.ceil(cur/mid);
return acc+a;
} ,0)
if(needPeople<=n){
    //더 많은 사람이 필요하다. 보석을 한 사람에서 덜 줘야한다. 
    right=mid-1;
} else{
    left=mid+1;
}
}

console.log( left)