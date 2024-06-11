/*
	
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N,...S] = fs.readFileSync(filePath).toString().trim().split("\n");

const [n,k]=N.split(" ").map(Number);
const map=S.slice(0,n).map(i=>i.split(' '));
const f=S.slice(n).map(i=>i.split(' ').map(Number));
// 상하좌우중심
const d=[[1,0], [-1,0], [0,1], [0,-1], [0,0]];
//효과 구별을 위해서 표시용 맵을 새로 만든다. 
const effectMap=Array.from({length:n}, ()=>Array.from({length:n}, ()=>0));
for(let [a,b] of f){
	const [x,y]=[a-1, b-1];
	for(let [dx,dy] of d){
		const [nx, ny]=[x+dx, y+dy];
		if(nx>=0 && nx<n && ny>=0 && ny<n && map[nx][ny]!=='#'){
			const a =map[nx][ny];
			if(a==='0')effectMap[nx][ny]++;
			if(a==='@')effectMap[nx][ny]+=2;
		}
	}
}
//map을 다 펴준다. 
const bombResult=effectMap.flat(2);
console.log(Math.max(...bombResult))
