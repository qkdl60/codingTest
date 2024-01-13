/*
앞으로는 계속 이길것이다. 

1<=x<=1.000,000,000; 으로 일반 탐색으로는 안된다. 
완전탐색 방식으로 
x의 최대 십억 부터하고 반절씩 진행?
변하면 줄이고 안변하면 올리고 
차이가 안나는건? 1% 이하인경우]

*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [x,y] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number);
let max=Number.MAX_SAFE_INTEGER;
let min=x;
let rate= Math.floor((y*100)/x);
let flag=true
if(rate>=99){
    max=x-1;
    flag=false
}
while(flag){
   
    const game=Math.floor((max+min)/2);
    if(min>=game)break;
    const win=game-x+y;
    const winRate=Math.floor((win/game)*100);
    if(winRate>99){
        max=x-1;
        break;
    }
    if(winRate!==rate){
        max=game;
    }else{
        min=game;
    }
   
}
console.log(max-x)


