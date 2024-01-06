const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,T]= fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
const towers=T.split(" ").map(Number)
//높의 감소수열을 index로 담을 배열

const bigTowers=[0];
const answer=[0];
/*
왼큰수 
죄측부터 조사하면서 앞에 큰수가 있었는지 조사하고 감소 수열을 만들어준다. 앞에 나보다 작다면 있어도 의미가 없다.
배열에 넣을때는 index로 넣어서 

*/
for(let i=1; i<towers.length; i++ ){
    const cur=towers[i];
    while(bigTowers.length){
        const compareIndex=bigTowers[bigTowers.length-1]
        const compare=towers[compareIndex]
        if(cur<compare){
            bigTowers.push(i);
            answer.push(compareIndex+1);
            break;
        }
        else{
            bigTowers.pop();
        }
    }
    if(bigTowers.length===0){
        bigTowers.push(i);
        answer.push(0);
    }
}
console.log(answer.join(" "))