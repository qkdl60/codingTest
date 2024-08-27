const fs=require("fs");
const filePath=process.platform ==='linux'?'/dev/stdin':'./input.txt';
const [[n],...list]=fs.readFileSync(filePath).toString().trim().split('\n').map(i=>i.split(' ').map(Number));
/*
스카이라인의 고도가 바뀌는 지점=> 좌표 x,y

없는 x는 앞에와 같다 

그림 그리기 => 그림 안 그려도 된다. 


어떠 기준으로 카운트?  앞에와 높이가 같다면 같은 건물 취급 높이가 같더라도 앞에 나보다 작은 게
있었다면 다른 건물 취금  x가 최대 1000000으로 한번 순회로 가능

굳이 모든 스카이라인 만들 필요 없다 . n 개 만으로 가능

해당 라인보다 높은 라인은 리셋이 필요 =>  slice 보다는 해당 라인 위로만 리셋? 스택으로 처리가 빠르겠다 .
*/

const line =[];
let count = 0 ;
for(let [x, y] of list){
    
    if(line.length===0 && y!==0){
        line.push(y);
        count++;
        continue;
    }
    while(line.length){
        const a =line[line.length-1];
        if( a>y){
            line.pop();
            continue;
        }
        if(a===y) break;
        if(a<y){
            line.push(y);
            count++;
        }
    }
    if(line.length===0 && y!==0){
        line.push(y);
        count++;
    }    
}
console.log(count)
