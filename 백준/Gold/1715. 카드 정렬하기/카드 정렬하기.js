const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n,...cards] = fs.readFileSync(filePath).toString().trim().split("\n").map(num=>num*1);
cards.sort((a,b)=>a-b);
// 가장 작은 묶은 두개를 뽑는다 그후 합쳐진 카드뭉치를 다시 넣고 다시 가장작은 카드뭉치 두개를 뽑는다 반복 ,최소 
function MinHeap() {
  this.heap = [0];
  this.insert = (v) => {
    this.heap.push(v);
    let p = this.heap.length - 1;
    while (p > 1 && this.heap[Math.floor(p / 2)] > this.heap[p]) {
      let tmp = this.heap[Math.floor(p / 2)];
      this.heap[Math.floor(p / 2)] = this.heap[p];
      this.heap[p] = tmp;
      p = Math.floor(p / 2);
    }
  };
  this.getLength = () => {
    return this.heap.length;
  };
  this.delete = () => {
    if (this.heap.length - 1 < 1) {
      return 0;
    }
    let deletedItem = this.heap[1];
    this.heap[1] = this.heap[this.heap.length - 1];
    this.heap.pop();
    let p = 1;
    while (p * 2 < this.heap.length) {
      let min = this.heap[p * 2];
      let minP = p * 2;
      if (p * 2 + 1 < this.heap.length && min > this.heap[p * 2 + 1]) {
        min = this.heap[p * 2 + 1];
        minP = p * 2 + 1;
      }
      if (this.heap[p] < min) {
        break;
      }
      let tmp = this.heap[p];
      this.heap[p] = this.heap[minP];
      this.heap[minP] = tmp;
      p = minP;
    }
    return deletedItem;
  };
}


const list=new MinHeap();

for(let a of cards){
    list.insert(a);
}
 let cnt = 0;

  for (let i = 1; i < n; i++) {
    //제일 작은 카드 두개의 묶음을 빼낸다.
    let card1 = list.delete();
    let card2 = list.delete();
    //카드 두 묶음을 계산후 카운트
    let sum = card1 + card2;
    cnt += sum;
    //계산된 결과를 최소힙에 넣어줌
    list.insert(sum);
  }
  console.log(cnt);
