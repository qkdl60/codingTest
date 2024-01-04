const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,C] = fs.readFileSync(filePath).toString().trim().split("\n");
const [l,c]=N.split(" ").map(Number);
const char=C.split(" ").sort();

const getPermutations=(arr, length)=>{
    const results=[];
    if(length===1)return arr.map(i=>[i]);

    arr.forEach((v,index,origin)=>{
        const rest =[ ...origin.slice(index+1)];
        const p=getPermutations(rest, length-1);
        const cur=p.map(i=> [v,...i]);
        results.push(...cur);
    })
    return results;

}
const a=['a','e', 'i','o', 'u'];
// 최소 한개의 모음, 최소 두개의 자음
const answer=getPermutations(char, l).filter(i=>{
    const as=[];
    const bs=[];
    i.forEach(v=>{
        if(a.includes(v))as.push(v);
        else bs.push(v);
    })
    return as.length>=1 && bs.length>=2 ? true: false  
});
console.log( answer.reduce((acc,cur)=>{
   return acc+=cur.join("")+'\n'; 
},''))