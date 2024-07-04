const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [[n], ...s]=fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number));
const members=Array.from({length:n}, (_,index)=>index);

const combinations=getCombinations(members, n/2);
const totalScore=s.reduce((acc,cur)=>{
    acc+=cur.reduce((acc2,cur2)=>acc2+=cur2, 0 );
    return acc;
}, 0);
let minGap=Number.MAX_SAFE_INTEGER;
for(let ATeam of combinations){
    const BTeamSet=new Set(members);
    for(let a of ATeam){
        BTeamSet.delete(a);
    }
    const BTeam=[...BTeamSet];
    const BTeamCb=getCombinations(BTeam,2);
    let BTeamScore=0;
    const ATeamCb= getCombinations(ATeam, 2);
    let ATeamScore=0;
    for(let i =0; i<BTeamCb.length; i++){
        const [ai,aj]=ATeamCb[i];
        const [bi,bj]=BTeamCb[i];
        ATeamScore+=(s[ai][aj]+s[aj][ai]);
        BTeamScore+=(s[bi][bj]+s[bj][bi]);
    }
    minGap=Math.min(minGap, Math.abs(ATeamScore-BTeamScore))
    if(minGap===0)break;
    
}
console.log(minGap)



function getCombinations(array, selectNumber) {
//결과를 저장할 빈 배열 results
    const results = [];
//1개만 선택하는 경우, 먼저 처리해준다. 
    if (selectNumber === 1) return array.map((value) => [value]);
//fixed는 현재 선택된 값,origin은 array, 
    array.forEach((fixed, index, origin) => {
//array에서 현재 선택된 값을 빼서 남은 array인 rest를 만든다. 
        const rest = origin.slice(index + 1);
//rest에서 다시 선택한다. 
				const combinations = getCombinations(rest, selectNumber - 1);
//반환된 것들을 results에 넣어준다.        
				 const attached = combinations.map((combination) => [fixed, ...combination]);
        results.push(...attached);
    });
// 합쳐진 결과 배열을 반환 한다. 
    return results;
}