class MinHeap{
    constructor(){
        this.heap=[null];
    }

    swap(a,b){
        [this.heap[a], this.heap[b]]=[this.heap[b],this.heap[a]];
    }
    push(value){
        this.heap.push(value);

        let current =this.heap.length-1;
        let parent= Math.floor(current/2);

        while(parent !==0 && this.heap[parent][1] > value[1]){
            this.swap(current, parent);

            current=parent;
            parent= Math.floor(current/2);
        }
    }

    pop(){
        if(this.heap.length===1) return null;
        if(this.heap.length===2) return this.heap.pop();

        const returnValue=[...this.heap[1]];
        this.heap[1]=this.heap.pop();

        let parent=1;
        let left=2; 
        let right =3; 
        while((this.heap[left] &&this.heap[left][1] <this.heap[parent][1]) 
              ||(this.heap[right] && this.heap[right][1]< this.heap[parent][1])){

            if(this.heap[right]===undefined || this.heap[left][1] <this.heap[right][1]){
                    this.swap(left, parent);
                    parent=left;

            }else{

                this.swap(right,parent)
                parent=right;
                
            }
            left=parent*2;
            right=left+1;    
        }

        return returnValue;
    }   
    
    isEmpty(){
        return this.heap.length===1;
    }

    reset(){
        this.heap=[null];
    }
    
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [[n,m,x], ...list] = fs.readFileSync(filePath).toString().trim().split("\n").map(i=>i.split(" ").map(Number))

const graph=Array.from({length:n}, ()=>[]);
const graph2=Array.from({length:n}, ()=>[]);

for(let [s,e,w] of list ){
    graph[s-1].push([e-1,w]);
    graph2[e-1].push([s-1,w])
}
const heap=new MinHeap();
const dist =Array(n).fill(Infinity); // 각 그래프에서 x로 가는 최단거리 
const dist2= Array(n).fill(Infinity);
dist[x-1]=0;
heap.push([x-1, 0 ]);
while(!heap.isEmpty()){
    const [current, currentW]=heap.pop();
    for(let [next, cost ] of graph[current]){
        if( currentW+cost < dist[next]){
            dist[next]=currentW+cost;
            heap.push([next, currentW+cost]);
        }
    }
    
}
dist2[x-1]=0;
heap.reset();
heap.push([x-1,0 ]);
while(!heap.isEmpty()){
    const [current, currentW]=heap.pop();
    for(let [next, cost ] of graph2[current]){
        if( currentW+cost < dist2[next]){
            dist2[next]=currentW+cost;
            heap.push([next, currentW+cost]);
        }
    }
    
}
let max= Number.MIN_SAFE_INTEGER;
for(let i =0; i< n ;i++){
   max=Math.max(max,  dist[i]+dist2[i])
}

console.log(max)





