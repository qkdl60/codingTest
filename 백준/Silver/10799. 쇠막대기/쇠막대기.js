const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const s = fs.readFileSync(filePath).toString().trim()
/*
'('=> 쇠 막대기 시작
')'=> 쇠 막대기 끝
"()"=> 레이저저어어엉

*/
// 레이저를 모두 변경해준다.
const replaced=s.replaceAll("()", "L").split("");
//'('을 만나면 넣어주고, ')'만나면 하나씩 빼준다.
const steal=[]
let total=0;
replaced.forEach(i=>{
    if(i==="(")steal.push(i);
    if (i===')'){
        steal.pop();
        total++
    }
    if(i==="L"){
        total+=steal.length;
    }  
})
console.log( total)