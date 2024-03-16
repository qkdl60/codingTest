class MinHeap {
    constructor() {
        this.heap = [null];
    }

    push(value) {
        this.heap.push(value);
        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);

        while (parentIndex !== 0 && this.heap[parentIndex].cost > value.cost) {
            this._swap(parentIndex, currentIndex)

            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        }
    }
    //스키마 {node, cost }
    pop() {
        if (this.isEmpty()) return;
        if (this.heap.length === 2) return this.heap.pop();

        const returnValue = this.heap[1];
        this.heap[1] = this.heap.pop();

        let currentIndex  = 1;
        let leftIndex = 2;
        let rightIndex = 3;
        while ((this.heap[leftIndex] && this.heap[currentIndex].cost > this.heap[leftIndex].cost) || 
               (this.heap[rightIndex] && this.heap[currentIndex].cost > this.heap[rightIndex].cost)) {
            if (this.heap[leftIndex] === undefined) { // 왼쪽 정점이 없을 경우
                this._swap(rightIndex, currentIndex)
                currentIndex=rightIndex;
            } else if (this.heap[rightIndex] === undefined) { // 오른쪽 정점이 없을 경우
                this._swap(leftIndex, currentIndex)
                currentIndex=leftIndex;
            } else if (this.heap[leftIndex].cost > this.heap[rightIndex].cost) {
                this._swap(rightIndex, currentIndex)
                currentIndex=rightIndex;
            } else if (this.heap[leftIndex].cost <= this.heap[rightIndex].cost) {
                this._swap(leftIndex, currentIndex)
                currentIndex=leftIndex;
            }
            leftIndex = currentIndex * 2;
            rightIndex = currentIndex * 2 + 1;
        }

        return returnValue;
    }

    isEmpty() {
        return this.heap.length === 1;
    }

    _swap(a, b) { // 편의를 위해 배열의 요소를 swap하는 함수 작성
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
}




const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [ve,start,...path] = fs.readFileSync(filePath).toString().trim().split("\n");
let [v,e]=ve.split(" ").map(i=>Number(i));
start=Number(start);
path=path.map(i=>i.split(" ").map(j=>Number(j)));
const graph=Array.from({length:v+1},()=>[])
for(let [from, to, cost]of path){
    graph[from].push([to ,cost]);
}

const dist=Array.from({length:v+1},()=>Infinity);
dist[start]=0;
const heap=new MinHeap();
heap.push({node:start, cost:0});
while(!heap.isEmpty()){
    const {node:current, cost:currentCost}= heap.pop();
    if(dist[current]<currentCost)continue;
    for(let[to, cost] of graph[current]){
        const nextCost=cost+currentCost;
        if(dist[to]<=nextCost)continue;
        else{
            dist[to]=nextCost;
            heap.push({node:to, cost:nextCost});
        }
    }
}
let answer="";
for(let i=1; i<=v; i++){
    if(dist[i]==Infinity)answer+="INF\n";
    else answer+=dist[i]+"\n";
}
console.log(answer)

