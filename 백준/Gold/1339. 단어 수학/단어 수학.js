
/*
최대값=> 그리디, 완전탐색
10*8=> 최대 길이
10가지 

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n,...list] = fs.readFileSync(filePath).toString().trim().split("\n");
n=Number(n);
//자리수가 크고 ,앞자리의 문자가 큰수를 받아야하낟. 같은 인덱스에 있다면 더 많이 사용된, 단순히 인덱스를 하는것이 아니라 각 천의 
//천의 자리이면 1000을 더해주고 이런식으로 해당 알파벳의 총량을 구할 수 있따 .,

const alphabetScore= {}
list.forEach(i=>{
    i.split("").reverse().forEach((j,index)=>{
        const score=10**Number(index);
        if(alphabetScore.hasOwnProperty(j))alphabetScore[j]=Number(alphabetScore[j])+Number(score);
        else alphabetScore[j]=score;
    })
})
const alphabetMap={}
Object.entries(alphabetScore).sort((a,b)=>b[1]-a[1]).forEach((i, index)=>{
    const [key]=i;
    alphabetMap[key]=9-index;
});
const maped=list.map(i=>i.split('').map(j=>alphabetMap[j]).join('')).reduce((acc,cur)=>acc+Number(cur), 0);
console.log( maped)