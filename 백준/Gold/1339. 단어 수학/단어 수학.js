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

//알파벳를 key, 점수를 value로 가지는 객체
const alphabetScore= {}
list.forEach(i=>{
    //해당 라인의 알파벳을 뒤집어주고 계산한다.
    //뒤집는 이유는 자리수 계산을 위해서다. 1의 자리 인덱스는 0, 10의 자리는 1, 100의 자리는 2 이런식으로 계산하기 더 좋다.
    i.split("").reverse().forEach((j,index)=>{
        // 자리수로 10에 제곱을 해주고 해당 값을 스코어에 더해준다. 
        const score=10**Number(index);
        //해당 알파벳이 등록이 되었으면 더해주고, 없다면 새로 넣어준다.
        if(alphabetScore.hasOwnProperty(j))alphabetScore[j]=Number(alphabetScore[j])+Number(score);
        else alphabetScore[j]=score;
    })
})
//총점에 따라서 숫자랑 맵핑을 해준다.그것을 저장할 객체
const alphabetMap={}
// 점수를 기준으로 내림차순으로 정렬하고 가장 앞에 있는 알파벳에 9, 뒤에는 8, ... 차례로 맵핑한다
// 이 과정은 정렬된 index를 이용하면 쉽다. 
Object.entries(alphabetScore).sort((a,b)=>b[1]-a[1]).forEach((i, index)=>{
    const [key]=i;
    alphabetMap[key]=9-index;
});
// 맵핑된 숫자로 변환해주고 reduce 로 모두 더해준다. 
const maped=list.map(i=>i.split('').map(j=>alphabetMap[j]).join('')).reduce((acc,cur)=>acc+Number(cur), 0);
console.log( maped)