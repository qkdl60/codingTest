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
const [N,...L] = fs.readFileSync(filePath).toString().trim().split('\n');
const [n,m]=N.split(" ").map(Number);
const map= L.map(i=>i.split('').map(Number));
const d=[[1,0], [0,1], [-1, 0], [0,-1]];
const heap=new MinHeap();
heap.push([[0,0], 0]);
const visited=Array.from({length:m}, ()=>Array(n).fill(Infinity));
visited[0][0]=0;
while(!heap.isEmpty()){
    const [a, current]=heap.pop();
    const [x,y]=a;
    for(let [dx,dy] of d){
        const [nx,ny]=[x+dx, y+dy];
        
        if(nx>=0 && nx<m && ny>=0 && ny<n ){
            const nextC=current+map[nx][ny];
            if(visited[nx][ny]>nextC){
                visited[nx][ny]=nextC;
                heap.push([[nx,ny], nextC]);
            }
            
        }
    }
    
}
console.log( visited[m-1][n-1])

