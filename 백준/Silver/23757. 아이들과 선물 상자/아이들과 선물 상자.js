
class MaxHeap{
    constructor(){
        this.heap=[null];
    }

    swap(idx1,idx2){
        let tmp = this.heap[idx1];
        this.heap[idx1] = this.heap[idx2];
        this.heap[idx2] = tmp;
    }

    pop(){
        if(this.heap.length===1) return null;
        if(this.heap.length ===2) return this.heap.pop();

        const returnValue=this.heap[1];
        this.heap[1]=this.heap.pop();
        let current=1;
        let left=2;
        let right=3;

        while(this.heap[current]< this.heap[left] || this.heap[current]< this.heap[right]){
            if( this.heap[left]>this.heap[right] || this.heap[right]===undefined){
                this.swap(left, current);
                current=left;
            }else{
                this.swap(right, current);
                current=right;
            }
            left=current*2;
            right=left+1;
        }
        return returnValue
    }
    push(value){
        this.heap.push(value);
        let current=this.heap.length-1;
        let parent =Math.floor(current/2);
        while(parent!=0 && this.heap[parent]<value){
            this.swap(parent, current);
            current=parent ;
            parent=Math.floor(current/2)
        }
    }
    size(){
        return this.heap.length-1;
    }
    top(){
        return this.size()===0? 0 : this.heap[1];
    }
}
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const s= fs.readFileSync(filePath).toString().trim().split('\n');
const [[n,m],p, c]=s.map(i=>i.split(" ").map(Number))
const heap=new MaxHeap();
let answer= 1;
for(let a of p){
    heap.push(a);
}
for(let a of c){
    const b =heap.pop();
    if(b<a){
        answer=0;
        break;
    }
    heap.push(b-a);
}
console.log(answer) ;
