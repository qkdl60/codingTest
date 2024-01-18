const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S,L]= fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(S);
const list = L.split(" ").map(Number).sort((a,b)=>a-b);


let count =0;
list.forEach((a, index)=>{
    let left=0;
    let right=list.length-1;
    while(left<right){
        if(left===index){
            left++;
            continue;
        }
        if(right===index){
            right--;
            continue;
        }
        const sum=list[left]+list[right];
        if(sum>a){
            right--;
        }else if(sum <a){
            left++;
        }else if (sum===a){
            count++;
            break;
        }
    }
    
})
console.log( count)