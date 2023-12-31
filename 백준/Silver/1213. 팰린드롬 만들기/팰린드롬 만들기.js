const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const s = fs.readFileSync(filePath).toString().trim().split("");
const imposible="I'm Sorry Hansoo";
const strs={};
s.forEach(i=>{
    if(strs.hasOwnProperty(i))strs[i]=strs[i]+1;
    else strs[i]=1; 
})
if(Object.values(strs).filter(i=>i%2===1).length>1){
    console.log(imposible)
return ;
}
//결과값으로 사전 순으로 가장 앞, 중간에 대한 구현=> 홀수개를 나눈다. 무조건 홀개가 중간은 아니다
const evenStr=[];
const oddStr=[];
for(let [key,value] of Object.entries(strs)){
    if(value%2===1){
        oddStr.push(key);
        if(value>1)evenStr.push(...key.repeat((value-1)/2).split(""));
    }else evenStr.push(...key.repeat(value/2).split(''));
}
evenStr.sort();
const reversed=[...evenStr].reverse();
const answer= evenStr.join('')+oddStr.join('')+reversed.join("");
console.log( answer);