class MinHeap{
    constructor(){
        this.heap=[null];
    }
    swap(i1,i2){
        [this.heap[i1], this.heap[i2]]=[this.heap[i2], this.heap[i1]];
    }
    size(){
        return this.heap.length-1;
    }
    isEmpty(){
        return this.heap.length===1;
    }

    push(value){
        this.heap.push(value);

        let current=this.heap.length-1;
        let parent=Math.floor(current/2);

        while(parent!==0 && this.heap[parent] > value){
            this.swap(parent,current);
            current=parent;
            parent=Math.floor(current/2);
        }
    }
    top(){
        return this.heap[1];
    }
    pop(){
        const returnValue=this.heap[1];
        
        this.heap[1]=this.heap.pop();
        let current=1; 
        let left=2;
        let right=3;

        while(this.heap[current]> this.heap[left] || this.heap[current] > this.heap[right]){
            if(this.heap[left]< this.heap[right] || this.heap[right]===undefined){
                this.swap(left, current);
                current=left;
            }else{
                this.swap(right,current);
                current=right;
            }
            left=current*2;
            right=left+1;
        }
        return returnValue;
    }
}


const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...L ]= fs.readFileSync(filePath).toString().trim().split("\n");
const n= Number(N);
const list =L.map(i=>i.split(' ').map(BigInt)).sort((a,b)=>Number(a[0])-Number(b[0]));

// 같은 시간에 시작되는 경우도 있을것이다. 
const heap=new MinHeap();
let maxSize=Number.MIN_SAFE_INTEGER;
for(const [s,e] of list ){
    // heap에 없다면 넣어 주고 , 잇다면 최상위 비교, 최상위가 s 보다 크다면  e를 넣어준다. 작다면 빼주고 e를 넣어준다.
    if(heap.isEmpty()){
        heap.push(e);
    }else{
        if(heap.top()<=s) heap.pop();
        heap.push(e);
    }
    maxSize=Math.max(maxSize, heap.size())
}
console.log(maxSize)