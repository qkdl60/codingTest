const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, M] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n,k]=N.split(" ").map(Number);
const m=M.split("").map(Number).reverse();

/*
k개 만큼 숫자를 제거하고 가장 큰 수 
숫자 제거의 기준?
 가장 작은 숫자 ?, 앞자리가 커야되서 앞자리 제거?
 앞에서부터 뒤에보다 작다면 제거? 
감소 수열

다돌았는데도 k가 남는다면


*/
const answer= [];
let count =0;

while(m.length){
    if( count=== k){
        answer.push(...m.reverse())
        break;
    }
    const cur=m.pop();
    //그냥 넣어주는 경우
    if(answer.length===0 || answer[answer.length-1]>=cur){
        answer.push(cur);
        continue
    }
    // 제거해야되는 경우
    const last= answer.at(-1);
    if(last<cur){
        answer.pop();
        m.push(cur)
        count++;
        continue;
    }
}


  //뒤부터 잘라야한다. 
while(true){
    if(count===k)break
    answer.pop();
    count++
} 

console.log( answer.join(''))