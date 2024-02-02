const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const s = fs.readFileSync(filePath).toString().trim().split('\n');
s[0]=s[0].split("")
let start=0;
let end =s[1].length;
let count=0;

while(true){
    if(s[0].slice(start,end).join('')===s[1]){
        s[0].splice(start, s[1].length);
        count++;
    }else{
        start++;
        end++;
    }
    if(end>s[0].length)break
}
console.log(count)