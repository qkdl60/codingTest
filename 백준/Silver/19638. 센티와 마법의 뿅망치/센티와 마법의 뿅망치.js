/*
 마법의 뿅망치를 효율적으로 사용하기 위한 전략
 가장 키가 큰 거인 가운데 하나를 때리기 

 모든 거인의 키가 센티보다 작도록 할 수 있다. YES
 이 후 뿅망치 최소 사용 회수 
 else NO 
 이 후 가장큰 거인의 키 
 
 대상이 가장 큰 키의 거인이다. 우선순위 큐? 
*/
class Node{
    constructor(value){
        this.data=value
        this.priority=value;
    }
}

class MaxHeap{
    constructor(){
        this.heap=[null];
    }
    
    swap(a,b){
        [this.heap[a], this.heap[b]]=[this.heap[b], this.heap[a]]
    }
    
    push(value){
        const newNode= new Node(value);
        this.heap.push(newNode);
        
        let current=this.heap.length-1; 
        let parent=Math.floor(current/2);
        while(parent!==0 && this.heap[parent].priority<value){
            this.swap(parent,current);
            current=parent;
            parent=Math.floor(current/2);
        }
    }
    
    pop(){
        if(this.heap.length===1)return null;
        if(this.heap.length===2)return this.heap.pop().data;
        
        const returnNode=this.heap[1];
        this.heap[1]=this.heap.pop();
        
        let current=1; 
        let left =2; 
        let right =3; 
        while((this.heap[left] && this.heap[current].priority< this.heap[left].priority )||
            (this.heap[right] && this.heap[current].priority<this.heap[right].priority)
        ){
            if(this.heap[right]===undefined || this.heap[left].priority>this.heap[right].priority ){
                this.swap(current, left);
                current=left;
            }else{
                this.swap(current, right);
                current=right;
            }
            left=current*2;
            right=left+1;
        }
        
        return returnNode.data;
    }
    
    top(){
        if(this.heap.length===1)return null;
        return this.heap[1].data;
    }
    isEmpty(){
        return this.heap.length===1;
    }
}


const fs= require('fs');
const filePath=process.platform==='linux'? '/dev/stdin':'./input.txt';
const [N, ...S]=fs.readFileSync(filePath).toString().trim().split("\n");
const [n,hh,t]= N.split(' ').map(Number);
const gh=S.map(Number);
const heap=new MaxHeap();
for(let a of gh){
    heap.push(a);
}
let count= 0; 
while(heap.top()!==1 && heap.top()>=hh && count<t  ){
    const a =heap.pop();
    //소수점 처리 어찌함? 제한 사항이 없네 ㅠㅠ
    heap.push(Math.floor(a/2))
    count++; 
}
const answer = heap.top() <hh ? `YES\n${count}`:`NO\n${heap.top()}`
console.log(answer)