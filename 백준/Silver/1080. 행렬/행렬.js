/*

행렬을 변환하는 연산은 3*3의 부분 행렬을 뒤집는 것이다. 조건은 3*3 이상이다.
연산의 횟수의 최솟값=> 그리디, 완전 탐색 
n,m은 50 이하 그러면 완전탐색인가?



*/


const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,...list]= fs.readFileSync(filePath).toString().trim().split("\n")

const [n,m]=N.split(" ").map(Number);
const a=list.slice(0, n).map(i=>i.split("").map(Number));
const b =list.slice(n).map(i=>i.split("").map(Number));
let count=0;
for(let i =0; i< n-2; i++){
    for(let j=0 ; j<m-2; j++){
        if(a[i][j] !==b[i][j]){
            flip(i,j);
            count++;
        }
    }
}

for(let i=0; i<n; i++){
    for(let j =0 ; j<m; j++){
        if(a[i][j]!=b[i][j])count=-1;
    }
}
console.log(count)


function flip(i,j){
    for(let c= i; c<=i+2; c++){
        for(let d =j; d<=j+2; d++){
            a[c][d]=a[c][d]===0 ? 1: 0 ;
        }
    }
}