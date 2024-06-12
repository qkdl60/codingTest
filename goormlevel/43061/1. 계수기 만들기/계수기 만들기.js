/*
진수야 

k가 1000000 작아서 1씩올려주기각 가능하다. 

*/
const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [N,M, I, K]=fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
let k=Number(K);
const max= M.split(" ").map(Number);
let init=I.split(' ')

for( let i = 0; i<k; i++){
	let a=Number( init.at(-1));
	a++;
	init[init.length-1]=a;
	for(let j=n-1;j>=0 ; j--){
		const m =max[j];
		const a =init[j];
		if(a>m){
			init[j]='0';
			if(j!==0){
				const b= Number(init[j-1])+1+'';
				init[j-1]=b;
			}
		}
	}
}
console.log(init.join(''))



