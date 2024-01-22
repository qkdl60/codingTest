const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const S = fs.readFileSync(filePath).toString().trim().split("\n");
const [[n,m],list]=S.map(i=>i.split(" ").map(Number));
if(n<=m){
    console.log(n);
    return;
}
/*
운영시간동안 태운 사람의 수를 구한다. 
그리고 모든 인원인 타는 최소 시간을 구하고  
해당 시간에 사람을 탑승 시간 놀이기구를 filter하고 그 중에서 구한다.

*/
let left = 0n; 
let right= BigInt(Math.max(...list))*BigInt(n);
let total 
while(left<= right){
    const mid= (left+right)/2n;

    let count=0n;
    list.forEach(i=>{
        const total=mid/BigInt(i)+1n;
        count+=total;
    })
    if( BigInt(n)>count){
        //사람들이 적게 탔다, 시간이 부족했다. 
        left=mid+1n;
    }else{
        right=mid-1n;
    }
}
//해당 분에 모든 인원이 다 타게 된다. 
const mins=Number(left);
const endList =[];

list.forEach((i,index)=> {
    if( mins%i===0){
        endList.push(index+1);
    }
})
let preTotal=0;
for(let a of list ){
    const b =Math.floor((mins-1)/a)+1
    preTotal+=b;
}
const gap=n-preTotal;

console.log( endList[gap-1])

