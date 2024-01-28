const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...L] = fs.readFileSync(filePath).toString().trim().split("\n");
const stack=[];
const result=[]
L.forEach(i=>{
    const [o, t]=i.split(" ");
    if(o==='push')stack.push(Number(t));
    else if(o==='top'){
        if(stack.length)result.push(stack[stack.length-1]);
        else result.push(-1);
    }else if(o==='pop'){
        const a =stack.pop();
        if(a)result.push(a);
        else result.push(-1);
    }else if (o==='size'){
        result.push(stack.length);
    }else if( o==='empty'){
        if(stack.length)result.push(0);
        else result.push(1)
    }
})
console.log(result.join("\n"))
