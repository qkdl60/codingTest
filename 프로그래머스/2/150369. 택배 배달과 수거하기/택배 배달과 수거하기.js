/*
최대한 가져가서 끝에서 부터 뿌리고 
최대한 끝에서 부터 가져온다. 
*/
function solution(cap, n, deliveries, pickups) {
    let count=0;
    while (deliveries.length || pickups.length ){
        let d=0;
        let p=0;
        if(deliveries.length){
            d=go(cap, deliveries);
        }
        if(pickups.length){
            p=go(cap, pickups);
        }
        
        count+=Math.max(d, p) *2;
    }
    return count;
    
}

function go(cap, array){
    // 한번 가는 것에 대한 함수 
    //이동한 거리를 리턴한다. 
    while( array.length  && array[array.length-1]===0)array.pop();
    if(array[array.length-1]===cap){
        const returnValue=array.length;
        array.pop();
        return returnValue;
    }
    if(array[array.length-1]> cap){
        array[array.length-1]=array[array.length-1]-cap;
        return array.length;
    }
    if(array[array.length-1]<cap){
        const returnValue=array.length; 
        //결과 값은 상관 없는데 배열 처리 필요 
        let currentCap=cap-array[array.length-1];
        array.pop();
        go(currentCap,array);
        return returnValue;
    }
    return 0
}