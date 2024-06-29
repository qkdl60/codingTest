/*

에러시 게임 종료 
*/
const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [N, ...S]=fs.readFileSync(filePath).toString().trim().split('\n');
const [n,c]=N.split(' ').map(Number);
const orders=S.slice(0, n).map(i=>i.split(" ").map(Number));
const cards=S.slice(n).map(i=>i.split(',').map(j=>j.split(' ')));
const indexArray=[];
for(let i=0; i<orders.length; i++){
    const [count, ...cards]=orders[i];
    const a=i.toString().repeat(count).split("");
    indexArray.push(...a);
}
const permutations=getPermutations(indexArray, indexArray.length);
const permutationsArray=[...new Set(permutations.map(i=>i.join('')))]
const resultSet =new Set();



for(let a of permutationsArray){
    const currents=Array.from({length:n}, ()=>0);
    let result=''
    for(let i=0; i<a.length; i++){
        if(result==='ERROR')break;
        const index= Number(a[i]);
        const cardOrder=currents[index];
        const [count, ...cardIndexs]=orders[index];
        const cardIndex=cardIndexs[cardOrder]-1;
        const commands=cards[cardIndex];
        for(let [command,t] of commands){
            if(command==='ADD')result+=t;
            else{
                if(result[Number(t)]===undefined){
                    result='ERROR';
                    break;
                }else{
                    let temp= result.split("");
                    temp[Number(t)]='';
                    result=temp.join("");
                }
            }
        }
        currents[index]++;   
    }
    resultSet.add(result===''?'EMPTY':result);
}
console.log([...resultSet].sort().join('\n'))





function getPermutations(arr, selectNum) {
//결과를 넣어주 results  
	const results = [];
//결과가 1개를 원하면 각 원소를 반환
  if (selectNum === 1) return arr.map((value) => [value]); 
  
  arr.forEach((fixed, index, origin) => {
// 순열은 앞에서 사용했던것도 다시 사용해야해서 해당하는 fixed를 제외한 나머지 배열을 rest로 만든다. 
//이런석으로 재귀를 하면 이전에 사용된 것을 빼고 다 넘길 수 있다.=> 중복 걱정 x	    
		const rest = [...origin.slice(0, index), ...origin.slice(index+1)] 
    const permutations = getPermutations(rest, selectNum - 1); 
    // 돌아온 순열에 대해 떼 놓은(fixed) 값 붙이기
		const attached = permutations.map((permutation) => [fixed, ...permutation]);
		//만들어진 것 결과에 넣기 
	    results.push(...attached); 
	  });
  
  return results; // 배열에 대한 모든 순열 반환
}
