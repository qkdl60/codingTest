/*
    이기는 플레이어를 만나야 이긴다. 
    
*/
const fs = require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [N,S,...P]=fs.readFileSync(filePath).toString().trim().split("\n");
const [n,p]=N.split(' ').map(Number);
const [w,l,g]=S.split(" ").map(Number);
const playerInfo=P.slice(0,p).map(i=>i.split(" "));
const game=P.slice(p);
const playerWin=new Set();
for(const [player, r] of playerInfo){
    if(r==='W')playerWin.add(player);
}
let currentScore=0;
let flag=false;
for(let player of game){
    if(playerWin.has(player)){
        currentScore+=w;
        if(currentScore>=g){
            console.log('I AM NOT IRONMAN!!')
            flag=true;
            break;
        }
        continue;
    }
    currentScore-=l
    if(currentScore<0)currentScore=0;
}
if(!flag)console.log('I AM IRONMAN!!')
