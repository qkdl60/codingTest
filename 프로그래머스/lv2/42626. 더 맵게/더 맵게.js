class MinHeap {
    constructor() {
        this.heap = [ null ];
    }
    
    size() {
        return this.heap.length - 1;
    }
    
    getMin() {
        return this.heap[1] ? this.heap[1] : null;
    }
    
    swap(a, b) {
        [ this.heap[a], this.heap[b] ] = [ this.heap[b], this.heap[a] ];
    }
    
    heappush(value) {
        this.heap.push(value);
        let curIdx = this.heap.length - 1;
        let parIdx = (curIdx / 2) >> 0;
        
        while(curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
            this.swap(parIdx, curIdx)
            curIdx = parIdx;
            parIdx = (curIdx / 2) >> 0;
        }
    }
    
    heappop() {
        const min = this.heap[1];	
        if(this.heap.length <= 2) this.heap = [ null ];
        else this.heap[1] = this.heap.pop();   
        
        let curIdx = 1;
        let leftIdx = curIdx * 2;
        let rightIdx = curIdx * 2 + 1; 
        
        if(!this.heap[leftIdx]) return min;
        if(!this.heap[rightIdx]) {
            if(this.heap[leftIdx] < this.heap[curIdx]) {
                this.swap(leftIdx, curIdx);
            }
            return min;
        }

        while(this.heap[leftIdx] < this.heap[curIdx] || this.heap[rightIdx] < this.heap[curIdx]) {
            const minIdx = this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx;
            this.swap(minIdx, curIdx);
            curIdx = minIdx;
            leftIdx = curIdx * 2;
            rightIdx = curIdx * 2 + 1;
        }

        return min;
    }
}
function solution(scoville, K) {
    /*
        스코빌 지수가 가장 낮은 두 개의 음식을 섞어 새로운 음식을 만든다 
        섞은 음식의 스코빌 지수= 가장 맵지 않은 음식의 스코빌지수 +( 두번째로 맵지 않은 스코빌 지수*2)
        
        모든 음식의 스코빌 지수가 K 이상이면 stop
        
        섞어야 하는 최소 횟수 
        
        없다면 0, 만들 수 없다면 -1 
        최대길이 백만으로 -1이 나올경우 
        밑에 두개 조합, 정렬 , 조합 정렬
        마지막이 k 이상일때 까지, 길이가 1이될때까지 
        최대길이 백만으로 순회로 끝내거나 이분탐색
        제일 작은 것, 두번째로 작은 것을 뽑는다 조합 
        k보다 큰 것은 필요 없다, 필요하더라도 k보다 큰 값은 하나만 
        
        최소힙 만들기 
    */
    
    const heap=new MinHeap();
    scoville.forEach(s=>{
        heap.heappush(s);
    })
    let count =0;
    while(heap.size()>1 && heap.getMin()<K){
        const a=heap.heappop()
        const b=heap.heappop();
        const c=a+(b*2);
        heap.heappush(c)
   
        //sort를 빼거나 다른 방법으로 순회, sort를 빼주면 위치를 어떻게 잡아주지?, 시간복잡도를 1로 
        count++;
    }
    
    return heap.getMin()<K ?-1: count;
}