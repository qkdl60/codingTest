const fs= require('fs');
const filePath= process.platform==='linux'?'/dev/stdin': './input.txt';
const [N, ...list]=fs.readFileSync(filePath).toString().trim().split('\n');
const[k,l]=N.split(" ").map(Number);

/*
  대기 목록은 큐  
  set 순서 보장?
*/
const que=new Set();
for(let a of list){
    if(que.has(a)){
        que.delete(a);
        que.add(a);
    }else{
        que.add(a);
    }
}
const queList =[...que];
console.log(queList.slice(0,k).join('\n'))