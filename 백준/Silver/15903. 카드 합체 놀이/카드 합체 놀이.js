
/*

*/
class MinHeap{
    constructor(){
        this.heap=[null];
    }

    swap(i1,i2){
        [this.heap[i1], this.heap[i2]]=[this.heap[i2], this.heap[i1]];
    }

    pop(){
        if(this.heap.length===1) return null;
        if(this.heap.length ===2) return this.heap.pop();

        const returnValue=this.heap[1];
        this.heap[1]=this.heap.pop();
        let current=1;
        let left=2;
        let right=3;

        while(this.heap[current]> this.heap[left] || this.heap[current]> this.heap[right]){
            if( this.heap[left]<this.heap[right] || this.heap[right]===undefined){
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
        while(parent!=0 && this.heap[parent]> value){
            this.swap(parent, current);
            current=parent ;
            parent=Math.floor(current/2)
        }
    }
}


const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,L]= fs.readFileSync(filePath).toString().trim().split("\n");
const[n,m]=N.split(" ").map(Number);
const list =L.split(' ').map(BigInt);
const heap = new MinHeap();

for(let a of list ){
    heap.push(a);
}

for(let i=0; i<m; i++){
    const a =heap.pop();
    const b= heap.pop();
    const c= a+b; 
    heap.push(c);
    heap.push(c);
   
}
const result =heap.heap;
result.shift();
const answer =result.reduce((acc,cur)=> acc+cur, 0n );
console.log(answer.toString())