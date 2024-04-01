/*
n은 도시 개수 
m은 버스의 개수 (간선)
비용 => BFS ❌;
마지막 출발 도착 
우선순위 큐 필요

*/
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
const [N,M,...L] = fs.readFileSync(filePath).toString().trim().split("\n");
const n =Number(N);
const m=Number(M);
const list =L.map(i=>i.split(" ").map(Number))
const [s,e]=list.pop();
const graph=Array.from({length:n}, ()=>[])
for(const [f,t,c] of list){
    graph[f-1].push([t-1,c]) //[도착, 비용]
    
}
//bfs로 일단 시작 , 경로를 어떻게 잡아야할까?ㄱ
const dist =Array.from({length:n}, ()=>[Infinity, []])
dist[s-1]=[0, [s-1]]
let  queue=new MinHeap();
queue.push([s-1,0]);
while(!queue.isEmpty()){
    const [current, currentW]=queue.pop();
    if(dist[current][0]<currentW)continue;
    for(let[next, cost] of graph[current]){
        const nextW=currentW+cost ;
        if(dist[e-1][0]<cost || dist[e-1][0]<nextW  )continue;//
        if(nextW<dist[next][0]){
            dist[next]=[nextW, [...dist[current][1], next]]
            queue.push([next, nextW])
        }
    }    
}

console.log( `${dist[e-1][0]}\n${dist[e-1][1].length}\n${dist[e-1][1].map(i=>i+1).join(" ")}`)