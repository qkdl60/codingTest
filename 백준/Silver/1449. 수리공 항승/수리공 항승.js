//적어도 좌우 간격 .5만큼은 줘야 물이 다시는 안 샌다 => 구멍끝과 끝 거리는 최대 l-1이 돼야하한다. 겹쳐도 된다=> 끝이 오버돼도 ok 
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [x,y] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n,l]=x.split(" ").map(Number);
const positionX=y.split(' ').sort((a,b)=>a-b);

let answer=0;
while(positionX.length){
    const a=Number(positionX.shift());
    answer++;
    const range=a+l-1;
    let flag=true;
    if(positionX.length===0)break;
    else{
        while(flag){
            const b=Number( positionX[0]);
            if(b<=range)positionX.shift();
            else flag=false;
        }
    }
    
}
console.log( answer)