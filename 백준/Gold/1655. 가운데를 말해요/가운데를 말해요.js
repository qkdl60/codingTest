/*
말했던값중 중간값 
짝수이면 작은 값을 
우선순위 큐

최소힙
---중위값----
최대힙

각 길이는 같거나 최대힙이 +1한 경우 이다. 만약 길이가 다르다면 끝값을 넘겨준다.  
*/

class MinHeap{
    constructor(){
        this.heap=[null];
    }
    swap(i1,i2){
        [this.heap[i1], this.heap[i2]]=[this.heap[i2], this.heap[i1]];
    }
    push(value){
        this.heap.push(value);
        let current=this.heap.length-1; 
        let parent =Math.floor(current/2);
        while(parent !==0 && this.heap[parent]>value){
            this.swap(current, parent);
            current=parent;
            parent = Math.floor(current/2);
        }
    }
    pop(){
        if(this.heap.length===1)return null;
        if(this.heap.length===2)return this.heap.pop();
        const returnValue=this.heap[1];
        this.heap[1]=this.heap.pop();
        let current=1; 
        let left= 2; 
        let right =3; 
        while(this.heap[current]>this.heap[left]
              ||this.heap[current] >this.heap[right]){
            if(this.heap[left]<this.heap[right] || this.heap[right]===undefined){
                this.swap(current,left);
                current=left;
            }else{
                this.swap(current, right);
                current=right;
            }
            left=current*2;
            right=left+1;
        }
        return returnValue;
    }
    top(){
        return this.heap[1]
    }
    size(){
        return this.heap.length-1;
    }
} 
class MaxHeap{
    constructor(){
        this.heap=[null];
    }
    swap(i1,i2){
        [this.heap[i1], this.heap[i2]]=[this.heap[i2], this.heap[i1]];
    }
    push(value){
        this.heap.push(value);
        let current=this.heap.length-1; 
        let parent =Math.floor(current/2);
        while(parent !==0 && this.heap[parent]<value){
            this.swap(current, parent);
            current=parent;
            parent = Math.floor(current/2);
        }
    }
    pop(){
        if(this.heap.length===1)return null;
        if(this.heap.length===2)return this.heap.pop();
        const returnValue=this.heap[1];
        this.heap[1]=this.heap.pop();
        let current=1; 
        let left= 2; 
        let right =3; 
        while(this.heap[current]<this.heap[left]
              ||this.heap[current]<this.heap[right]){
            if(this.heap[left]>this.heap[right] || this.heap[right]===undefined){
                this.swap(current,left);
                current=left;
            }else{
                this.swap(current, right);
                current=right;
            }
            left=current*2;
            right=left+1;
        }
        return returnValue;
    }
    top(){
        return this.heap[1]
    }
    size(){
        return this.heap.length-1;
    }
} 


const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n, ...s] = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);
const min=new MinHeap();
const max= new MaxHeap();
const result=[];

s.forEach((value, index)=>{
    if(index===0){
        max.push(value);
        result.push(value);
        return;
    }
    if(value>max.top() && value>min.top()){
        min.push(value);
    }else{
        max.push(value);
    }
    if(max.size()-min.size()>=2){
        min.push(max.pop());
    }else if(min.size()-max.size()>=1){
        max.push(min.pop())
    }
    result.push(max.top())
})
console.log( result.join('\n') )
