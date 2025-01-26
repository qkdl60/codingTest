/*
n개의 포인트, 서로 다른 번호

로봇마다 정해진 운송경로, 
로봇은 첫 포인트에서 시작, 순서대로 포인트 방문, 최단 경로로 이동
로봇은 x대,0초에 동시 출발, 1초마다 좌표하나 이동 => 4방향, 좌표가 (r,c)라면 r좌표이동을 먼저 
운송경로는 m개의 포인트
이동 중 같은 좌표에 로봇이 2대 이상 모인다=>동싱 겹치는 상황, 충돌
충돌이 일어나는 곳에 로봇 대수는 상관x, 동시에 여러 곳에서 일어나면 ++;

막힌 경로가 없다, 최단 경로는 고정된다 . r축이동 후 c축이동

*/

function solution(pointList, routeList) {
    const secondsList= [[]];
    let n=0;
    let m=0;
    routeList.forEach(route=>{
        const routeLength=route.length;
        let seconds=0;
        for(let i =0; i<routeLength; i++){
            if(i===0){
                const currentPointOrder= route[i];
                 const [cx,cy]=pointList[currentPointOrder-1];
                secondsList[seconds].push([cx,cy])
               
            }else{
            
            const prevPointOrder= route[i-1];
            const [px,py]= pointList[prevPointOrder-1];
            const currentPointOrder =route[i];
            const [cx,cy]=pointList[currentPointOrder-1];
            const xDist=Math.abs(cx-px);
            const xp=(cx-px)/xDist;
            let nx= px;
            
            for(let i =0; i<xDist; i++){
                nx+=xp;
                n=Math.max(nx, n);
                seconds++;
                const a =secondsList[seconds];
                if(a)a.push([nx,py]);
                else secondsList[seconds]=[[nx,py]];
            }
            const yDist= Math.abs(cy-py);
            const yp=(cy-py)/yDist;
            let ny= py;
            for(let i=0; i<yDist; i++){
                ny+=yp;
                m=Math.max(ny, m);
                seconds++;
                const a =secondsList[seconds];
                if(a)a.push([nx,ny]);
                else secondsList[seconds]=[[nx,ny]];
            }
                
            }
        }
        
    })
    let count =0; 
    for(let i =0;i< secondsList.length; i++){
        const map=Array.from({length:n+1}, ()=>Array.from({length:m+1},()=>0));
        const second= secondsList[i];
        for(let [x,y] of second){
            map[x][y]++;
            const a =map[x][y];
            if(a===2)count++;
        }
    }

return count
    
    
    
}

    