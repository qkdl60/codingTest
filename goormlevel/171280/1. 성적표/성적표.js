/*
	

*/
const fs =require('fs');
const filePath= process.platform==='linux'?'/dev/stdin':'./input.txt';
const [[n,m], ...s]=fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(" ").map(Number));
const testScore=[null];
for(let i =1; i<=m; i++ ){
	testScore.push({score:0 , count:0});
}
for(let [i, score] of s){
	testScore[i].score+=score;
	testScore[i].count++;
}

const a= testScore.map(t=>{
	if(t===null)return null;
	return t.score===0 ?0:t.score/t.count
})
//null 제거
a.shift();
let max={score:Number.MIN_SAFE_INTEGER, index:0};

a.forEach((s,i)=>{
	if(max.score<s){
		max.score=s;
		max.index=i+1;
	}
})
console.log(max.index)
