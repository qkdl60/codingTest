/*
조건에 맞는 최대 공약수를 얻기위해서 몇개의 수를 제거 해야하는가?
- 수를 제거 후 얻은 최대 공약수가 더 커야한다. 
- 최소의 개수를 제거 

2<= n <= 300000  
최대 30번까지 

수열의 최대 공약수 어찌 뽑지?
- 1부텉 최대 값까지 올리면 비교  ?
- 최대 공약수는 가장 작은 값의 약수 중에서 나온다.

최대 공약수가 증가 할 수 있는 경우
가장 작은 값은 약수 중 더 큰 약수에 해당안되는 경우 그 수를 제거한다. 
최대 공약수가 가장 작은 값이라면 해당 수를 제거 한다.

최대 공약수를 최대한 키우는것이 목적인가 ?????????
모든 약수를 구해서 넣고 큰수 부터 공약수인지 확인 공약수라면  포함안되는 개수 


*/
const fs=require('fs');
const filePath=process.platform==='linux'? '/dev/stdin': './input.txt';
const [N,S]=fs.readFileSync(filePath).toString().split('\n');
const n=Number(N);
const s= S.split(" ").map(Number).sort((a,b)=>a-b)
const set=new Set() ;
s.forEach(v=>{
	const sqrt= Math.sqrt(v);
	for(let i =1; i<=sqrt; i++){
		if(v%i===0){
			set.add(i);
			set.add(v/i)
		}
	}
})
const setAr=[...set].sort((a,b)=>b-a);
setAr.pop();
if(setAr.length<=1){
	console.log(-1);
	return; 
}
let isNotReturnFlag=true;
while(setAr.length){
 const a =setAr.pop();
	const filtered=s.filter(i=>i%a===0);
	if(filtered.length>1 && filtered.length<n){
		console.log(n-filtered.length)
		isNotReturnFlag=false;
		break;
	}
}
// 반복문에서 못 찾았ㅇ르때 
if(isNotReturnFlag)console.log(-1);

