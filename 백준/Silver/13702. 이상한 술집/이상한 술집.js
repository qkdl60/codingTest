const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,...L] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n,k]=N.split(' ').map(Number);
const list=L.map(Number)

let min=1n;
let max=BigInt(Math.max(...list));
while(min<=max){
    const mid=(min+max)/2n;
    let count=0n;
    for(let a of list ){
        const c=BigInt(a)/mid;
        count+=c;
    }
    //count가 크다는건 너무 조금씩 나눠줬다. 
    if(count>=BigInt(k)){
        min=mid+1n;
    }else{
        max=mid-1n;
    }
}
console.log(Number(max))