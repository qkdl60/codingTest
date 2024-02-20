class MaxHeap{
    constructor(){
        this.heap=[null];
    }
    swap(i1,i2){
        [this.heap[i1], this.heap[i2]]=[this.heap[i2], this.heap[i1]]
    }


    push(value){
        this.heap.push(value);
        let current=this.heap.length-1;
        let parent =Math.floor(current/2);

        while(parent!==0 && this.heap[parent]<value){
            this.swap(parent, current);
            current=parent;
            parent =Math.floor(current/2);
        }
    }
    pop(){
        if(this.heap.length===1)return null;
        if( this.heap.length===2)return this.heap.pop();

        const returnValue=this.heap[1];
        this.heap[1]=this.heap.pop();
        let current=1; 
        let left =2; 
        let right=3; 

        while(this.heap[current]<this.heap[left] || this.heap[current]<this.heap[right]){
            if(this.heap[left]> this.heap[right ] || this.heap[right ]===undefined){
                this.swap(left, current);
                current= left;
            }else{
                this.swap(right,current);
                current =right;
            }
            left=current*2;
            right=left+1;
        }
        return returnValue;
    }
    top(){
        return this.heap[1] ?? 0;
    }
    isEmpty(){
        return this.heap.length===1;
    }
}
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n,...list] = fs.readFileSync(filePath).toString().trim().split("\n");
const heap=new MaxHeap();
const result =[];

for(let a of list ){
    if(a==="0"){
            result.push(heap.isEmpty()?-1: heap.pop());
    }else{
        const [c,...p]=a.trim().split(" ").map(Number);
        for(const b of p){
            heap.push(b);
        }
    }
}
console.log(result.join('\n'))