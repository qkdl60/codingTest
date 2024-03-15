function solution(n, roads, sources, destination) {
    const graph=Array.from({length:n+1}, ()=>[]);
    for(const [x,y] of roads){
        graph[x].push(y);
        graph[y].push(x);
    }
    const answer=[]
    const dp=Array.from({length:n+1}, ()=>null);
    dp[destination]=0;
    bfs(destination,graph, dp )
    for(let a of sources){
        const result =dp[a];
        if(result===null)answer.push(-1);
        else answer.push(result)
    }
    return answer
};

//dp를 이용하면 단축이 가능하지 않을까?

function bfs(s, map,dp ){
    let queue=[s];
    const visited=Array.from({length:map.length}, ()=>false);
    visited[s]=true;
    let count=0;
    while(queue.length){
        count++;
        const replace=[]
        for(let a of queue){
            const n=map[a];
            for(let b of n){
              if(!visited[b]){
                  visited[b]=true;
                  replace.push(b)
                  dp[b]=count;
              }
            }
        }    
        queue=replace;
    }
    
}