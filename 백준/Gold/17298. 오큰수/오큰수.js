const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,m] = fs.readFileSync(filePath).toString().trim().split("\n")
const n=Number(N);
const list= m.split(" ").map(Number).reverse();
/* 현재 값보다 크고 가장 가까운 수 
list 뒤집고, 


*/
//overNumStack 감소 수열
const overNumStack=[list[0]];
const result=[-1];
for(let i =1; i<list.length; i++){
    const cur=list[i];
    while(overNumStack.length){
        const compare=overNumStack[overNumStack.length-1];
        if(compare>cur){
            overNumStack.push(cur);
            result.push(compare);
            break;
        }else{
            overNumStack.pop();
        }
    }
    if(overNumStack.length===0){
        overNumStack.push(cur);
        result.push(-1);
    }
}
console.log(result.reverse().join(" "))