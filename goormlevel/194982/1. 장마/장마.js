/*

배수시스템은 비 시작 후 3의 배수 되는 날마다 비가 오고 작동, 작동 날짜 기중 2일 이내



물을 어떻게 빼주지 
 	

최근 3일 이내에 비가왔다면 -1
*/
const fs =require('fs');
const filePath=process.platform==='linux'? '/dev/stdin': './input.txt';
	const [[n,m], l, ...r ]=fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(' ').map(Number));
let lastRain=new Set();
for(let j =0; j<r.length; j++ ){
	const [s,e]=r[j];
	for(let i =s-1; i<=e-1; i++){
		l[i]++;
		lastRain.add(i);
	}
	if((j+1)%3===0){
		//배수시스템 가동
		for(let a of [...lastRain]){
			l[Number(a)]--;
		}
		lastRain.clear()
	}
}
console.log(l.join(' '))