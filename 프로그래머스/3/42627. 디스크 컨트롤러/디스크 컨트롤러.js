/*
요청부터 처리까지 평균 시간을 줄이고 싶다. => 대기시간을 줄인다. 처리 시간이 짧은 순으로
힙에 들어가는것은 요청 시간 순으로 들어가고, 대기시 작업 순서는 작업시간이 짧은 순서로 진행 => 힙
힙은

해당 시간의 요청이 온 작업은 일단 힙으로 넣어준다. 
작업이 끝나는 시간이 라면 꺼내고 heap에서 하나 넣어준다.
힙이 없다면 다음 jobs 로 이동 
같은 시간에 여러개가 나올 수이 있따 .
*/
class MinHeap{
    constructor(){
        this.heap=[null]
    }
    swap(i1, i2){
        [this.heap[i1], this.heap[i2]]=[this.heap[i2],this.heap[i1]];
    }
    pop(){
        if(this.heap.length===1)return null;
        if(this.heap.length ===2 )return this.heap.pop();
        const returnValue=this.heap[1];
        
        this.heap[1]=this.heap.pop();
        
        let current =1; 
        let left= 2; 
        let right =3; 
        while((this.heap[left] && this.heap[current ][1]> this.heap[left ][1]) 
              ||(this.heap[right] && this.heap[current][1] > this.heap[right][1])){
            if((this.heap[left] && this.heap[right] &&this.heap[left][1]<this.heap[right][1])
               || this.heap[right]===undefined){
                this.swap(current, left);
                current =left;
                
            }else{
                this.swap(current, right);
                current =right;
                
            }
            
            left=current*2;
            right = left +1;
        }
        return returnValue;
    }
    push(value){
        this.heap.push(value);
        let current =this.heap.length-1; 
        let parent =Math.floor(current/2);
        
        while(parent!==0 && this.heap[parent ][1]>value[1]){
            this.swap(current, parent);
            current=parent;
            parent = Math.floor(current/2);
        }
    }
    isEmpty(){
        return this.heap.length===1;
    }
}

function solution(jobs) {
  //어떻게 진행할것인가 ???????/
    jobs.sort((a,b)=>b[0]-a[0]);
    const heap=new MinHeap();
    const result =[] ;
    const working =[];
    let time =0;
    while(true){
        const r= jobs.length===0 ? undefined: jobs[jobs.length-1];
        while(jobs.length && jobs[jobs.length-1][0]===time){
            const a= jobs.pop();
            heap.push(a);
        }
        
        if(working.length ===1 && working[0][2] ===time){
            const [r, l , e]= working.pop();
            result.push(e-r);
        }
        if((!heap.isEmpty()) && working.length===0){
            const a =heap.pop();
            working.push([...a,time+a[1]]);
        }
        time++;
        if(jobs.length===0 && heap.isEmpty() && working.length===0)break;       
    }
  
    return Math.floor( result.reduce((acc,cur)=>acc+cur)/result.length)
}
