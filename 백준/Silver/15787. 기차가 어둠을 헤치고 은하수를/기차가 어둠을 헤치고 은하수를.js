const fs =require('fs')
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [[n, m], ...list]= fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(' ').map(Number));

const train= Array.from({length:n}, ()=>Array.from({length:20}, ()=>'0'))
/*

바로 하차와 명령 후 하차는 차이가 있나?


*/



for(const order of list ){
    const [o, i ,x ]=order;

    if(o===1){
        const a =train[i-1][x-1];
        if(a==='0')train[i-1][x-1]='1';
    
    }else if(o===2){
        const a = train[i-1][x-1];
        if(a==='1')train[i-1][x-1]='0';
    }else if (o===3){
        train[i-1].unshift('0');
        train[i-1].pop()
     
    }else{
      train[i-1].push('0')
        train[i-1].shift();
    }
    
}
   

const seatSet=new Set();
train.forEach(t=>{
    const target =t.join('');
    seatSet.add(target);
})

console.log(seatSet.size)
//명령을 모두 수행 후 기차 상태를 비교 기록된 형태는 아웃 