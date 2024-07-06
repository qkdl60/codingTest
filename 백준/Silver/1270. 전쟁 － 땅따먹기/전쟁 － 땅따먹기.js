const fs=require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [n, ...s]=fs.readFileSync(filePath).toString().trim().split("\n");
/*

병사가 절반을 초과하면 그따은 지배
각 땅들을 지배한 군대의 번호 출력, 전쟁 중이면'syjkgw'출력
i번째 땅의 j번째 병사 번호 
n<=200
j<=100000
ij의 값이 절대값이면 배열 
 이중반복으로 가면 천만 이다 복잡도 오버 
 병사수는 반이상으
 
각 땅의 번호의 차지 비율을 알아야한다. 절반 초과하는 번호가 주인, 없다면'syjkgw
각 땅의 병사 수는 0번 인덱스 


*/

const result=[];
for(let l of s){
    const nums=l.split(' ');
    const a =majorityElement(nums);
    if(a===null)result.push('SYJKGW');
    else result.push(a);
}

console.log(result.join('\n'))





function majorityElement(nums) {
    let candidate = null;
    let count = 0;

    // 1단계: 후보자 찾기
    for (let i =1; i<nums.length; i++) {
        const num=nums[i];
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // 2단계: 후보자가 실제로 다수 요소인지 확인
    count = 0;
    for (let i =1; i<nums.length; i++) {
        const num=nums[i];
        if (num === candidate) {
            count++;
        }
    }
   

    // 다수 요소인지 확인
    if (count > Math.floor((nums.length-1) / 2)) {
        return candidate;
    } else {
        return null; // 다수 요소가 없는 경우
    }
}
