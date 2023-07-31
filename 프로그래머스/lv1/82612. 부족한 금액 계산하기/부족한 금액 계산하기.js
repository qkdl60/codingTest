function solution(price, money, count) {
   let pp=0;
    for(let i=1; i<=count; i++){
        pp+=price*i;
    }
    
    

    return pp>money ? pp-money: 0
}