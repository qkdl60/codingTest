const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,L] = fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
const list =L.split(' ').map(Number);
/*

뒤집어서 진행?
*/
const dp=Array.from({length:n}, (_,index)=>list[index]);

let max=0;
// for(let i =0; i< n; i++){
//     const next =list [i];    
//     for(let j=0; j<i; j++){
//         if(list[j]<next){ //list[j]가 list[i]보다 작다면 dp[j]+1이다. 이미 증가수열 길이가 저장되어있는 dp이다. 
//             //dp[i]와 비교하는 이유는  반복문을 통해서 이미 이전 비교 정보가 들어가 있어서 이다. 
//             dp[i]=Math.max(dp[i],dp[j]+list[i]);
//             max=Math.max(dp[i], max)
//         }
//     }
// }

const dp2=Array.from({length:n}, (_,index)=>list[index])
for(let i =0; i<n; i++){
    const next =list [ i];
    for(let j=0; j<i;j++){
        if(list[j]< list[i] && dp2[i] < dp2[j]+list[i]){
            dp2[i]=dp2[j]+list[i]
              
        }
    }
}
console.log(Math.max(...dp2))