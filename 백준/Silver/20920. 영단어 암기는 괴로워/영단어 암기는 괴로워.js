const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [N, ...list]=fs.readFileSync(filePath).toString().trim().split('\n');
const [n,m]=N.split(" ").map(Number);

const count={}
list.forEach(w=>{
    if(w.length<m)return;
    if(count[w])count[w]+=1;
    else count[w]=1;
})

const words=Object.keys(count).sort((a,b)=>{

    if(count[a]>count[b])return -1;
    else if (count[a]<count[b])return 1; 
    else if (a.length>b.length)return -1;
    else if(a.length<b.length)return 1;
    else if(a>b)return 1;
    else return -1
    
})
console.log(words.join('\n'))