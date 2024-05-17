/*
1. 주식 하나를 산다. => 미래에 현재 가격 보다 비싼 가격이 있다 매수 ,
2. 원하는 만큼 가지고 있는 주식을 판다. => 미래에 현재 가격 보다 비싼 가격이 없고, 주식을 가지고 있을때 다 판다. 
3. 아무것도 안한다. =>미래에 현재 가격 보다 비싼 가격이 없다.

최대 이익 => 최대 효율 => 그리디 

날의 수는 1,000,000 으로 일별 판단하면 시간 초과 

미래에 가격에 대해서는 어떻게 알것인가?
1. 정렬 후 비교 ?=> 중간 가격 비교 안된다.
2. 가격 배열 뒤에서부터 채원다. 앞 가격보다 크지 않다면 앞 가격을 채운다.  그리고  이 배열과 가격 배열 원소의 차이의 합이 최대 이

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [T, ...L] = fs.readFileSync(filePath).toString().trim().split('\n')
L.reverse();
const t= Number(T);
const answer=[]
for(let i=0; i<t; i++){
    const days=Number(L.pop());
    const data=L.pop().split(" ").map(i=>Number(i));
    let feature=data[data.length-1];
    let total=0;
    for(let i =data.length-2; i>=0; i--){
        const cur=data[i];
        if(feature>cur)total+=(feature-cur);
        else feature = cur
    }
answer.push(total);    
}
console.log(answer.join('\n'))

