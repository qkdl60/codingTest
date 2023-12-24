function solution(numbers, hand) {
    const keyboard=[[1,4,7, "*"], [2,5,8,0], [3,6,9,"#"]];
    const position={right:[2,3], left:[0,3]};
    /*
    1,4,7,* 은 L, 3,6,9, #는 R, 2,5,8,0은 가까운 손가락, 같다면 주 손으로
    */
    const keyMap=new Map();
    for(let i=0; i<3; i++){
        for(let j =0; j<4; j++){
            const key=keyboard[i][j];
            keyMap.set(key, [i,j]);
        }
    }
    
    const order=[]
    for(const a of numbers){
        const [i,j]=keyMap.get(a);
        if(i===0){
            order.push('left')
            position['left']=[i,j];
        }else if(i===2){
            order.push('right');
            position['right']=[i,j];
        }else{
            const [ri,rj]=position['right'];
            const [li,lj]=position['left'];
            const rDistance=Math.abs(i-ri)+Math.abs(j-rj);
            const lDistance=Math.abs(i-li)+Math.abs(j-lj);
            if(rDistance===lDistance){
                order.push(hand);
                position[hand]=[i,j];
            }else if(rDistance>lDistance){
                order.push('left');
                position['left']=[i,j];
            }else{
                order.push('right');
                position['right']=[i,j];
            }
        }
      
    }

  
    return order.reduce((acc,cur)=>acc+=cur==='right'? 'R':"L", '');
}