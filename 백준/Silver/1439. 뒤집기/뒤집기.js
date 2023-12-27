/*
    0 과 1 로 이루어진 문자열 s, 다솜이는 이 문자열을 모든 숫자가 같도록 

    할 수 있는 행동은 s에서 연속된 하나이상의 숫자를 잡고 모두 뒤집는 것이다.

    최소 행동 회수

    그리디 
    이 문제가 그리디문제인 이유 => 
    전체를 0으로 만들거나 1로 만들거나 
    
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let x = fs.readFileSync(filePath).toString().trim();
const a=x.split('0').filter(i=>i!=='').length;
const b=x.split('1').filter(i=>i!=="").length;
console.log( Math.min(a,b))
