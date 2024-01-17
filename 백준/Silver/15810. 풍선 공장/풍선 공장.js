const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,L] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n,m]=N.split(' ').map(Number);
const list=L.split(" ").map(Number)

let max=Math.max(...list)*m;
let min=1;
  let count=0;
while(min<=max){
    const mid= Math.floor((max+min)/2);
     count=0; 
    list.forEach((a,index)=>{
        const i=Math.floor(mid/a);
        count+=i;
    })
// 풍선을 많이 만든것은 시간이 많았다.시간을 줄여라
    if(count>=m){
        max=mid-1;
    }else{
        min=mid+1;
    }
}

    console.log(min)