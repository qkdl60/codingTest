const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n,m] = fs.readFileSync(filePath).toString().trim().split(" ").map(i=>i*1);
const arr=Array.from({length:n}, (_,idx)=>idx+1);
let answer=""
function DFS(depth,result){
    if(depth===m){
        answer+=result.join(" ")+'\n';
    }else{
        for(let i =0; i<n ; i++){
            let a =arr[i];
            result.push(a);
            DFS(depth+1, result);
            result.pop();
        }
    }
}
DFS(0, [])
console.log(answer)