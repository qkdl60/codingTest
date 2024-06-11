/*


*/
const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const n=Number(fs.readFileSync(filePath).toString().trim());

const result=Array.from({length:n},(_,index1)=>Array.from({length:n},(_,index2)=>(index1*n)+index2+1));
console.log(result.map(i=>i.join(' ')).join('\n'))