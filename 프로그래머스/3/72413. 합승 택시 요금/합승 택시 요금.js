/*
플로이트 위셜

출발 s, 
중간 지점 k 
종점 

*/
function solution(n, s, a, b, fares) {

    const dist =Array.from({length:n+1},(_)=>Array.from({length:n+1},(_)=>{
        return Infinity;
        
    }) );
    
    for(let [s,e, p] of fares){
        dist[s][e]=Math.min(dist[s][e], p);
        dist[e][s]=Math.min(dist[e][s], p);
    }
    
    for(let i =0 ; i<=n; i++){
        dist[i][i]=0;
    }
    for(let i =1; i <=n; i++){
        for(let j=1; j<=n; j++){
            for(let k=1; k<=n; k++){
                
                dist[j][k]=Math.min(dist[j][k], dist[i][j]+dist[i][k])
            }
        }
    }
    let min=Number.MAX_SAFE_INTEGER;
    for(let i =1; i<=n;i++){
        min=Math.min(min, dist[s][i]+dist[i][a]+dist[i][b])
    }
    return min
}


