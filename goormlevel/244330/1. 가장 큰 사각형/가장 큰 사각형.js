const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n,...s]= fs.readFileSync(filePath).toString().trim().split("\n")
let max=Number.MIN_SAFE_INTEGER;
for(let a of s){
	const [w,h]=a.split(" ").map(Number);
	max=Math.max(w*h, max)
}
console.log(max)