const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [S,...L] = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k]=S.split(" ").map(Number);
const list =L.map(Number).sort((a,b)=>a-b);
let left=0;
let point=k;
let answer=Math.min(...list);
while(point && left<n-1){
const a=list[left];
const b=list[left+1];
    if(a===b){
        left++;
        continue;
    }else{
        const gap=b-a;
        const needPoint=gap*(left+1);
        if( needPoint>point){
            // 필요포인트가 이전것을 모두 다음 레벨로 올릴 수 없다. 하지만 모든 레벨을 어느정도는 올릴수는 있다.
            const upCount=Math.floor(point/(left+1));
            point=0;
            answer=a+upCount
            break;
        }else{
            point-=needPoint;
            answer=b;
            left++;
            continue;
        }
    }
}
if(point!==0){
    
    const upCount=Math.floor(point/n);
    const a=list[list.length-1];
    answer=a+upCount;
}

console.log( answer)