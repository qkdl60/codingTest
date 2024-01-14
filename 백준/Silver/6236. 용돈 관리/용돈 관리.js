/*
n일 동안 자신이 사용할 금액을 계산,
m번만 출금,  
k원 인출=> 충분하면 그대로 사용, 모자르면 다시 입금 후 k원 출금

완전탐색 식으로 
최소<= k<=  최대 100000를 검탐색해 본다. 아니면 
*/
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...L] = fs.readFileSync(filePath).toString().trim().split('\n');
const [n,m]=N.split(" ").map(Number);
const list=L.map(Number);

let max= list.reduce((a, b) => a + b, 0);
//최소값은 하루 금액 중 최소를 뽑아도 된다. 하지만 속도상 크게 차이가 없어서 1부터 시작해도 괜찮다. 
let min=Math.max(...list);
while(min<=max){
    const mid=Math.floor((max+min)/2);
    //적당한지 덜하진, 오버했는지 어떤식으로 검사하지 ?기준은 M번
    const withdrawCount=countWithdraw(list, mid)
    if( withdrawCount>m){
        min=mid+1;
    }else{
        max=mid-1;
    }
}
console.log(min)

function countWithdraw(moneyArray, withdrawMoney){
let count=0;
let currentMoney=0;   

    for(let money of moneyArray){
        if(currentMoney< money){
            count++;
            currentMoney=withdrawMoney-money;
        }else{
            currentMoney-=money;
        }
    }
    return count
}
    

