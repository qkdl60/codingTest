function solution(n, edge) {
  const graph=Array.from({length:n+1},()=>[]);
    for(let x of edge){
        const [from, to]=x;
        graph[from].push(to);
        graph[to].push(from);
    }
    const visited=Array.from({length:n+1},()=>0);
    let q=[1];
    visited[1]=1;
    let countNode=[];
    let count=0;
    while(q.length){
        count++;
        let newq=[];
        for(let x of q){
            let a = graph[x];
            for(let y of a){
                if(visited[y]===0){
                    visited[y]=1;
                    newq.push(y);
                }
            }
        }
        q=newq
        if(q.length!==0)countNode=newq
    }
   return countNode.length;
    
}
