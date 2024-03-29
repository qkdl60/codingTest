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
let  list = fs.readFileSync(filePath).toString().trim().split("\n")
/*
bfs 도 가중치가 잇어서 불리하고 

*/

const d=[[1,0], [-1, 0 ], [0,1], [0,-1]];
const results= []
const heap=new MinHeap();
while(true){
    const n=Number( list.shift());
    if(n===0)break;
    const map =list.slice( 0, n).map(i=>i.split(' ').map(Number));
    list =list.slice(n);
    const visited=Array.from({length:n}, ()=>Array.from({length:n}, ()=>Infinity));
    visited[0][0]=map[0][0];
    heap.reset();
    heap.push([[0,0],visited[0][0]]);
    while(!heap.isEmpty()){
        const [[x,y],current]=heap.pop();
        for(let [dx,dy] of d){
            const [nx, ny]=[x+dx, y+dy];
            if( nx>=0 && nx<n && ny>=0 && ny< n ){
                if(visited[nx][ny]>current+map[nx][ny]){
                    visited[nx][ny]=current+map[nx][ny];
                    heap.push([[nx,ny], visited[nx][ny]]);
                }
            }
        }
        
    }
    
    results.push(visited[n-1][n-1])
}

console.log(results.map((i,index)=>`Problem ${index+1}: ${i}`).join("\n"))