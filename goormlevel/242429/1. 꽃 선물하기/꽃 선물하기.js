/*


*/
const fs= require('fs');
const filePath=process.platform ==='linux'?'/dev/stdin': './input.txt';
const [N, ...s]= fs.readFileSync(filePath).toString().trim().split("\n");
const n = Number(N);
let answer=''

for(const i of s){
	const [a,b]=i.split(" ").map(Number);
	const result =a<b?'Sunflower':a===b?"Tulip":"Rose";
	answer+=result+'\n';
}
console.log(answer)