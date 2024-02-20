/*
다솜이는 1번
모든 후보가 나 보다 득표수가 적어야한다. 
가장 많은 득표수가 나보다 1 적어야하낟. 
*/
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
}
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n, ...list ] = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);
const heap=new MaxHeap();
let d= list.shift();
for(const a of list ){
    heap.push(a);
}
let result =0;

while(d<=heap.top()){
    const a =heap.pop()-1;
    result++;
    d++;
    heap.push(a);
};
console.log( result  )

