

class MinHeap{ // schema {n, w }
    constructor(){
        this.heap=[null];
    }
    swap(a,b){
        [this.heap[a], this.heap[b]]=[this.heap[b], this.heap[a]]; 
    }

    push(value){
        this.heap.push(value);
        let currentIdx= this.heap.length-1;
        let parentIdx= Math.floor( currentIdx/2);
        while(parentIdx!==0 && this.heap[parentIdx].w >value.w){
            this.swap(currentIdx, parentIdx);
            currentIdx=parentIdx;
            parentIdx=Math.floor(currentIdx/2);
        }
    }

    pop(){
        if(this.heap.length===1) return null;
        if( this.heap.length===2) return this.heap.pop();
        
        const returnValue={...this.heap[1]};
        this.heap[1]=this.heap.pop();

        let current=1;
        let left= 2;
        let right =3; 

        while( (this.heap[left] && this.heap[current].w > this.heap[left ].w) 
              ||(this.heap[right] && this.heap[current].w > this.heap[right].w)
             ){
                if(this.heap[right] ===undefined || this.heap[left].w <this.heap[right].w){
                    this.swap(current, left);
                    current=left;
                }else{
                    this.swap(current, right);
                    current=right;
                }
                left=current*2; 
                right=left+1;
            
             }
        return returnValue
    }
    isEmpty(){
        return this.heap.length ===1;
    }
}
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N,S,...L] = fs.readFileSync(filePath).toString().trim().split("\n");
const [v,e]=N.split(' ').map(Number);
const s= Number(S);
const list =L.map(i=>i.split(" ").map(Number));
const dist= Array.from({length:v+1}, ()=>Infinity);
dist[0]=0;
dist[s]=0;
const graph=Array.from({length:v+1}, ()=>[]);


for(let [u,v,w] of list ){
    graph[u].push([v, w])// to, cost
}
const heap=new MinHeap();
heap.push({n:s, w:0});

while(!heap.isEmpty()){
    const a= heap.pop();
    if(dist[a.n]<a.w)continue;
    for(let [nextN, nextNodeW] of graph[a.n]){
        const nextWeight= dist[a.n]+nextNodeW;
        if( dist[nextN]<=nextWeight)continue;
        dist[nextN]=nextWeight;
        heap.push({n:nextN, w:nextWeight})
    }
    
}
let answer=''
for(let i=1; i<dist.length; i++){
    answer +=dist[i]===Infinity ? 'INF\n': dist[i]+'\n'
}
console.log(answer)


