

function solution(priorities, location) {
    const q=[];
    priorities.forEach((i,idx)=>q.push({idx:idx, priority:i}))
    let count=1;
    priorities.sort((a,b)=>a-b)
    while(q.length){
        let first=priorities.pop();
        while(first!== q[0].priority){
            q.push(q.shift());
        }
        let a=q.shift()
        if(a.idx===location)return count;
        else count++;
    }
}