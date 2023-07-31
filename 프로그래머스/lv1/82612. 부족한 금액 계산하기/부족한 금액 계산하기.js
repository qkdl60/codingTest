function solution(price, money, count) {
    /*이용가격 price, n번째 이용시 n*price , 놀이기구를 count번 탄다면 자신이 가지고 있느것에서       얼마가 모자란가? 부족하지않다면 0을 리턴
    
    이전 값에price를 해주고 모두 더한다. 
    1부터 n까지의 합은 n*(n+1)/2 이다. 
    
    */
    const total=count*(count+1)/2;
    const totalPrice=total*price;
    return totalPrice-money>0? totalPrice-money: 0;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//    let pp=0;
//     for(let i=1; i<=count; i++){
//         pp+=price*i;
//     }
    
    

//     return pp>money ? pp-money: 0
}