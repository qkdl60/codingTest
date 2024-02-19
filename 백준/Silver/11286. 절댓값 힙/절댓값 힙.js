/*
1
23
45 67

*/
class MinHeap{
    constructor(){
        this.heap=[null];
    }
   push(value){
       this.heap.push(value);
       let current=this.heap.length-1;
       let parent=Math.floor(current/2);
       while(parent!==0 
             && Math.abs(this.heap[current])<Math.abs(this.heap[parent]) 
             ||( Math.abs(this.heap[current])=== Math.abs(this.heap[parent]) 
             && this.heap[current]<this.heap[parent])
            ){
                this.swap(parent, current);
               current=parent;
               parent=Math.floor(current/2)
           
            }
   }

    pop(){
        if(this.heap.length===1)return 0;
        if(this.heap.length===2)return this.heap.pop();
        
        const returnValue=this.heap[1];
        this.heap[1]=this.heap.pop();
        let current=1;
        let left=2;
        let right=3
        //
        while(this.heap[left] && 
            Math.abs(this.heap[current])>Math.abs(this.heap[left]) 
              || Math.abs(this.heap[current])>Math.abs(this.heap[right])
              ||( Math.abs(this.heap[current])===Math.abs(this.heap[left]) && this.heap[current]> this.heap[left]) 
              ||(Math.abs(this.heap[current])===Math.abs(this.heap[right]) && this.heap[current]> this.heap[right])
             ){
                if(Math.abs(this.heap[left])<Math.abs(this.heap[right]) 
                   ||(Math.abs(this.heap[left])===Math.abs(this.heap[right]) && this.heap[left]<this.heap[right])
                   || this.heap[right]===undefined
                  ){
                    this.swap(current, left);
                    current =left;
                    //left랑 바꿔준다. 
                }else{
                    this.swap(current, right);
                    current =right;
                    //right랑 바꿔준다.
                }

                left=current*2;
                right=left+1;
            
             }
        return returnValue;
    }
    
    swap(a,b){
        [this.heap[a], this.heap[b]]=[this.heap[b], this.heap[a]];
    }
    
} 
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const s = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);
s.shift();
const result =[];
const heap=new MinHeap();
for(let a of s){
    if( a===0)result.push(heap.pop())
    else heap.push(a);
}
console.log(result.join('\n') )

