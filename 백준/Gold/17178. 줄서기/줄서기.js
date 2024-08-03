const fs =require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
let [n, ...list]=fs.readFileSync(filePath).toString().trim().split("\n")
n= Number(n);
list=list.map(i=>i.split(' '))
/*
첫째 줄 맨 앞만 이동이 가능하다. 

그럼 판단은 
대기로 갈 것인가? => 내 앞번호가 있다 
입구로 갈것인가 ? => 내가 제일 빠른 번호다 

전체 번호를 정렬된 순서로 갖는 배열을 만들고 해당  대기순, 줄 비교 
abcdefghijklmnopqrstuvwxyz

waiting에서 최대한 보낸다. 
현재 사람을 waiting에 보내거나 입구로 보낸다. 

*/

list=list.reduce((acc, cur)=>{
    cur.forEach(a=>{
        const [aC, aN]=a.split("-")
        acc.push([aC,Number(aN)])
    })
    return acc
}, [])
const sortedStack=[...list].sort((a,b)=>{
    const [ac, an]=a; 
    const [bc, bn]=b;
    if(ac===bc)return bn-an;
    if(ac>bc)return -1;
    if(ac<bc)return 1
})

const waiting=[];
for(const a of list ){
    while(waiting.length){
        const [ta,tn]=sortedStack[sortedStack.length-1];
        const [wa, wn]=waiting[waiting.length-1];
        if(ta===wa && wn===tn){
            waiting.pop();
            sortedStack.pop();
            continue;
        }
        break;
    }
    const [ta,tn]=sortedStack[sortedStack.length-1];
    const [aa, an]=a;
    if(ta ===aa && tn===an){
        sortedStack.pop();
        continue;
    }
    waiting.push([aa,an])
}
while(waiting.length){
        const [ta,tn]=sortedStack[sortedStack.length-1];
        const [wa, wn]=waiting[waiting.length-1];
        if(ta===wa && wn===tn){
            waiting.pop();
            sortedStack.pop();
            continue;
        }
        break;
}
console.log(!waiting.length && !sortedStack.length ? 'GOOD' :'BAD' )

