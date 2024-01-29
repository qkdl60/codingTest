const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n= fs.readFileSync(filePath).toString().trim()
    
const p=[2,3,5, 7,11];
for(let i=13; i<=Number(n); i++ ){
    if(isP(i))p.push(i)
}
let count=0; 

let left=0;
let right=1; 
let sum=p[0]
while(left<=right && right<=p.length){
    if(sum>=Number(n)){
        if(sum ===Number(n)){ 
            count++; 
        }
        sum-=p[left];
        left++;
    }else{
      
        sum+=p[right];
        right++;
    }
        
   
}

console.log(count )
function isP(n){
    for(let i=2; i<=Math.sqrt(n); i++){
        if(n%i===0){
            return false;
        }
    }
    return true;
}