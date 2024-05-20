const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const list = fs.readFileSync(filePath).toString().trim().split(' ').map(Number);
/*
세로 * 가로
가장 왼쪽 아래 칸에 위치, 


병든 나이트가 이동할 수 있는 최대 칸 수 

n,m은 최대 2,000,000,000 으로 완전 탐색 x

이동횟수가 4번 이상이면 모두 한번씩 사용=> 세로가 3이상, 가로가 7칸이상

세로가 2


최대환 우측 +1로 이동해야된다. 

100 50 은 4번 이상으로 4를 빼주고 나머지 +1+2(2칸씩 2번)

예외 사항 처리 추가 필요 

*/
//못 움직인다ㅁ
if(list[0]==1 || list[1]==1){
    console.log(1);
    return;
}
//높이가 2 라면  
if(list[0]===2 ){
// 2칸씩 이동
    if(list[1]<=8){
        console.log(Math.ceil(list[1]/2))
        return;
    }else{
        console.log(4);
        return;
    }
}

if(list[1]<=4){
console.log(list[1]);
return;

}
// 4번 이상에서 6
if(list[1]<=6){
    console.log(4);
    return;
}

console.log(list[1]-2)


