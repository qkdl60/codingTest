const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const[N,...L] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n,m]=N.split(" ").map(Number);
const list =L.map(Number).sort((a,b)=>a-b);

//-1, 1 차이는  2 , 
let left=0;
let right=1;
let min=Number.MAX_SAFE_INTEGER;
while(left<=right && right< n){
    let gap=list[right]-list[left];
    if(gap>=m){// 갭이 크다.면 갭을 줄여준다. left를 키원잗. 
        min=Math.min(min, gap)
        left++
    }else{
        right++;
    }
}
console.log(min)