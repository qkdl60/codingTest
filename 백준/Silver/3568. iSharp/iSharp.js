const fs= require('fs');
const filePath=process.platform='linux'?'/dev/stdin':'./input.txt';
const s=fs.readFileSync(filePath).toString().trim().replace(';', '').split(', ');
let base;
[base, s[0]]=s[0].split(' ');
const answer= s.map(i=>{
    const name=i.split('').filter(j=>(j!=='&' && j!=='[' && j!==']' && j!=='*')).join('');
    const type=i.split('').reduce((acc,cur)=>{
        if(cur==='[')acc.push('[]')
        if(cur==='&' || cur==='*')acc.push(cur);
        return acc;
    }, []).reverse().join("")
    return `${base}${type} ${name};`;
})
console.log(answer.join('\n'))