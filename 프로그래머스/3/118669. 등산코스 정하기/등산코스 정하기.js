/*
양방향 
등산로별로 이동하는데 일정 시간이 소요-> 경로별 비중

봉우리1개만, 원점회귀

*/
class Node{
    constructor(value, priority){
        this.value=value;
        this.priority=priority;
        
    }
}

class Heap{
    constructor(){
        this.heap=[null];
    }
    
    swap(a,b){
        [this.heap[a], this.heap[b]]=[this.heap[b], this.heap[a]];
    }
    
    push(node){
        this.heap.push(node);
        let current = this.heap.length-1; 
        let parent= Math.floor(current/2);
        while(parent!==0  && this.heap[parent].priority>node.priority){
            this.swap(current, parent);
            current=parent;
            parent =Math.floor(current/2);
            
        }
    }
    pop(){
        if(this.heap.length===1)return null;
        if(this.heap.length===2)return this.heap.pop();
        const returnValue  = this.heap[1];
        this.heap[1]=this.heap.pop();
        let current =1; 
        let left =2; 
        let right=3; 
        while(
            (this.heap[left] && this.heap[left].priority< this.heap[current].priority) || 
            (this.heap[right] && this.heap[right].priority< this.heap[current].priority)
        ){
            if(!this.heap[right] || this.heap[left].priority < this.heap[right].priority){
                this.swap(left, current);
                current=left;
            }else{
                this.swap(right, current);
                current=right;
            }
            left= current*2;
            right=left+1;
        }
        return returnValue;
    }
    isEmpty(){
        return this.heap.length===1
    }
}


function solution(n, paths, gates, summits) {
    const graph=Array.from({length:n+1}, ()=>[]);
    paths.forEach(p=>{
        const [i,j,w]=p;
        graph[i].push([j,w]);
        graph[j].push([i,w])
    })

    const isSummitList  = Array.from({length:n+1}, ()=>false);
    summits.forEach(summit=>{
        isSummitList[summit]=true;
    })
    
    const intensityList= Array.from({length:n+1}, ()=>Infinity);
    const heap =new Heap();
    gates.forEach(gate=>{
        const node= new Node(gate,  0)
        intensityList[gate]=0;
        heap.push(node);
    })
    


    //회전이 나온다 회전을 어떻게 막지? 중복 방지
    while(!heap.isEmpty()){
        const node = heap.pop();
        const current= node.value ;
        const currentWeight =node.priority;
       if(isSummitList [current] || intensityList[current]< currentWeight)continue;
        
        graph[current].forEach(nextPoint=>{
            const [next , nextWeight ]=nextPoint;
            const weight= Math.max(nextWeight, currentWeight);
            
            if(intensityList[next]>weight){
                intensityList[next]=weight;
                const node = new Node(next,weight);
                heap.push(node);
            }
                
        })
        
    }
    let answer =null;
    summits.sort((a,b)=>a-b);

    summits.forEach(summit=>{
        const inten=intensityList[summit];
        if( answer  === null ||answer[1]>inten){
            answer= [summit, inten]
        }
    })
    return answer ;
}