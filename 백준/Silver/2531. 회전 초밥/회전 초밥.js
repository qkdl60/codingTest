const fs = require('fs');
const filePath= process.platform==='linux'?'/dev/stdin':'./input.txt';
let [N, ...list]=fs.readFileSync(filePath).toString().trim().split("\n");
list= list.map(Number);
const [n,d, k,c]=N.split(" ").map(Number);
//초밥 가싯수 최댓값을 구하는 프로그램
const category= new Map()
const belt=[...list, ...list];
let left = 0;
let right =0;
let max= 0; 
//어떻게 돌것인가? 시작은 어떻게?
//k개 윈동우

for(let i = 0 ; i< k ; i++){
    const a=belt[right];
    category.set(a , (category.get(a)?? 0) +1)
    right++;
}
category.set(c, (category.get(c)?? 0) +1)

max=category.size;
while( right<n*2){
    const a =belt[right];
    const b= belt[left];
    category.set(a, (category.get(a)??0)+1 );
    category.set(b, category.get(b)-1);
    if(category.get(b)===0)category.delete(b)
    max= Math.max(category.size, max)
    right++;
    left++;
    if(max==k+1)break
}
console.log(max)

