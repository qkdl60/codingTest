/*
 모든 사람이 정해진 시간에 싸지방 이용
 
 컴퓨터는 번호가 매겨져있다. 
 비어있는 컴이 있다면 낮은 번호를 먼저 사용
 
 사람들이 기다리지 않고 싸지방을 이용할 수 있는 컴퓨터 최소의 개수와 
 각 자리의 사용 빈도 
 
 pc 자리는 우선 순위 큐로 시작 시간 순으로 들어와서,
 끝나는 시간으로 나온다.
 pc 번호를 어떻게 추적? 
 입장시 번호표를 들고 들어간다. 해당 번호 카운트
 나올때 반납, 번호표 저장소도 우선 순위 큐

    pc자리 우선 순위 큐는 끝나는 시간과 해당 컴 번호를 알고 있으면 된다.
    번호표 저장소는 번호만 

*/
class MinHeap{
    constructor(){
        this.heap=[null];
    }
    swap(a,b){
        
        [this.heap[a], this.heap[b]]=[this.heap[b], this.heap[a]];
     
    }
    
    insert(value){
        this.heap.push(value);
        let currentIdx=this.heap.length-1;
        let parentIdx=Math.floor(currentIdx/2);
        while(parentIdx !== 0 && this.heap[parentIdx]>value){
            this.swap(currentIdx, parentIdx);
            currentIdx=parentIdx;
            parentIdx=Math.floor(currentIdx/2);
        }
    }
    
    extract(){
        if(this.heap.length===1)return null;
        if(this.heap.length===2)return this.heap.pop();
        const returnValue=this.heap[1];
        
        this.heap[1]=this.heap.pop();
        let currentIdx=1;
        let leftIdx=2; 
        let rightIdx=3; 
        while(
            (this.heap[rightIdx] && this.heap[currentIdx] > this.heap[rightIdx] )||
            (this.heap[leftIdx] && this.heap[currentIdx] > this.heap[leftIdx])
        ){
            if(this.heap[rightIdx]===undefined || this.heap[leftIdx]<this.heap[rightIdx] ){
                this.swap(leftIdx, currentIdx);
                currentIdx=leftIdx;
            }else{
                this.swap(rightIdx, currentIdx);
                currentIdx=rightIdx;
            }
            leftIdx=currentIdx*2;
            rightIdx=leftIdx+1;
        }
        return returnValue;
    }
    
    isEmpty(){
        return this.heap.length===1;
    }
}


class TimeMinHeap{
    constructor(){
        //[끝나는 시간, 컴 번호]의 형식으로 들어올거다. 
        this.heap=[null];
    }
    swap(a,b){
        [this.heap[a], this.heap[b]]=[this.heap[b], this.heap[a]];
    }
    
    insert(value){
        this.heap.push(value);
        let currentIdx=this.heap.length-1;
        let parentIdx=Math.floor(currentIdx/2);
        while(parentIdx !== 0 && this.heap[parentIdx][0]>value[0]){
            this.swap(currentIdx, parentIdx);
            currentIdx=parentIdx;
            parentIdx=Math.floor(currentIdx/2);
        }
    }
    
    extract(){
        if(this.heap.length===1)return null;
        if(this.heap.length===2)return this.heap.pop();
        const returnValue=[...this.heap[1]];
        
        this.heap[1]=this.heap.pop();
        let currentIdx=1;
        let leftIdx=2; 
        let rightIdx=3; 
        while(
            (this.heap[rightIdx] && this.heap[currentIdx][0] > this.heap[rightIdx][0] )||
            (this.heap[leftIdx] && this.heap[currentIdx][0] > this.heap[leftIdx][0])
        ){
            if(this.heap[rightIdx]===undefined || this.heap[leftIdx][0]<this.heap[rightIdx][0]){
                this.swap(leftIdx, currentIdx);
                currentIdx=leftIdx;
            }else{
                this.swap(rightIdx, currentIdx);
                currentIdx=rightIdx;
            }
            leftIdx=currentIdx*2;
            rightIdx=leftIdx+1;
        }
        return returnValue;
    }
    
    top(){
        return this.heap[1];
    }
    
    size(){
        return this.heap.length-1;
    }
    isEmpty(){
        return this.heap.length===1;
    }
}


const fs= require('fs');
const filePath=process.platform==='linux'?'/dev/stdin':'./input.txt';
const [N, ...S]=fs.readFileSync(filePath).toString().trim().split("\n");
const n=Number(N);
const l=S.map(i=>i.split(' ').map(Number)).sort((a,b)=>a[0]-b[0]);


const numberHeap=new MinHeap();
const timeHeap= new TimeMinHeap();
let idx=1;
const frequency={};
for(const [startTime,endTime] of l){
    //timeHeap에서 startTime보다 작다면 다 꺼내서 번호 저장소에 넣어준다.

    while(!timeHeap.isEmpty() && timeHeap.top()[0]< startTime){
        const [e, comIdx]=timeHeap.extract();
        numberHeap.insert(comIdx);
    }
    if(!numberHeap.isEmpty()){
        const i=numberHeap.extract();
        frequency[i]++;
        timeHeap.insert([endTime, i]);
        continue
    }else{
        frequency[idx]=1;
        timeHeap.insert([endTime,idx]);
        idx++;
    }
    
}
console.log(Object.keys(frequency).length +"\n"+Object.values(frequency).join(' '))

