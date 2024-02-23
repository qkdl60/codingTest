const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,...test] = fs.readFileSync(filePath).toString().trim().split("\n");
const n= Number(N);
const result =[]
for(let i =0; i< n; i++){
    const t= test[i]
    const front =[];
    const back=[];
 
    for(let a of t ){
        switch(a){
            case '>':
                back.length>0 && front.push(back.pop())
                break;
            case '<':
                front.length>0 && back.push(front.pop());
                break;
            case '-':
                front.pop();
                break;
            default:
                front.push(a);
                break;
        }
    }
    result.push(front.join('')+back.reverse().join(''))
}
console.log(result.join('\n'))